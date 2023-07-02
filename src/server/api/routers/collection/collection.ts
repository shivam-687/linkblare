import { protectedProcedure } from '../../trpc';
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Tag, type Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import slugify from 'slugify';
import { type CollectionOutput, CreateCollectionSchema, DeleteCollectionSchema, GetCollectionSchema, ListCollectionSchema, UpdateCollectionSchema, UserCollectionFeedSchema } from "~/schema/Collection.schema";
import { createPaginator } from 'prisma-pagination'
import {
    createTRPCRouter,
    publicProcedure,
    adminProcedure
} from "~/server/api/trpc";
import { ServerConfig } from '~/server/config';
import createOrUpdateTags from '~/lib/helpers/createOrUpdateTags';
import { CollectionInclude, getCollectionInclude } from './collectionInclude';
import { ServerErrorHandler } from '../../error-handler/ServerErrorHandler';
import { z } from 'zod';
import { InfiniteSavedLinkListSchema } from '~/schema/Link.schema';


const paginate = createPaginator({ perPage: ServerConfig.itemLimit });


export const CollectionRouter = createTRPCRouter({
    create: adminProcedure.input(CreateCollectionSchema).mutation(async ({ ctx, input }) => {
        const { tags: tagNames, ...rest } = input;
        const prisma = ctx.prisma;
        try {
            const tags = await createOrUpdateTags(ctx.prisma, tagNames);

            const collection = await prisma.collection.create({
                data: {
                    ...rest,
                    createdBy: {
                        connect: {
                            id: ctx.session.user.id
                        }
                    },
                    tags: {
                        connect: tags.map((tag) => ({ id: tag.id })),
                    },
                },
                include: CollectionInclude,
            });

            return collection;
        } catch (error) {
            ServerErrorHandler(error);
        }
    }),

    update: adminProcedure.input(UpdateCollectionSchema).mutation(async ({ ctx, input }) => {

        const { id, title, desc, tags: tagNames } = input;

        // Get Existing collection of given id
        const existingCollection = await ctx.prisma.collection.findUnique({
            where: {
                id,
            },
            include: {
                tags: true,
            },
        });

        if (!existingCollection) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const tags = await createOrUpdateTags(ctx.prisma, tagNames);

        // Disconnect all current tags
        await ctx.prisma.collection.update({
            where: { id },
            data: {
                tags: {
                    disconnect: existingCollection.tags.map(tag => ({ id: tag.id }))
                }
            }
        })


        const updatedCollection = await ctx.prisma.collection.update({
            where: {
                id,
            },
            data: {
                title,
                desc,
                tags: {
                    connect: tags.map(tag => ({ id: tag.id })),
                },
            },
            include: CollectionInclude
        });

        return updatedCollection;
    }),


    delete: adminProcedure.input(DeleteCollectionSchema).mutation(async ({ ctx, input }) => {
        const { id } = input;
        const res = await ctx.prisma.collection.delete({
            where: { id },
        });

        return res;
    }),


    get: publicProcedure.input(GetCollectionSchema).query(async ({ ctx, input }) => {
        const { id } = input;
        const user = ctx.session !== null ? ctx.session.user : undefined;
        const res = await ctx.prisma.collection.findFirst({
            where: { id },
            include: {
                tags: true,
                saves: user ? {
                    where: { userId: user.id }
                } : undefined,
                createdBy: {
                    select: {
                        name: true,
                        email: true,
                        role: true,
                    }
                },
                _count: {
                    select: {
                        links: true,
                        saves: true
                    }
                }
            },
        });
        return res;
    }),

    list: publicProcedure.input(ListCollectionSchema).query(async ({ ctx, input }) => {
        const { filter, search, pagination, sort } = input;
        const tags = filter?.tags?.map(tag => slugify(tag)) || undefined

        const res = await paginate<CollectionOutput, Prisma.CollectionFindManyArgs>(
            ctx.prisma.collection,
            {
                where: {
                    title: search && {
                        contains: search,
                        mode: 'insensitive'
                    },
                    tags: tags && { some: { slug: { in: tags } } }
                },
                include: getCollectionInclude(ctx.session?.user.id),
                orderBy: sort || {
                    createdAt: 'desc'
                }
            },
            pagination
        );

        return res;
    }),
    collectionFeed: publicProcedure.input(UserCollectionFeedSchema).query(async ({ ctx, input }) => {
        const { search, cursor, take, sort } = input;
        const userId = ctx.session?.user.id;
        const currenctTake = input.take && input.take + 1 || ServerConfig.itemLimit + 1
        const currentCursor = input.cursor;
        let nextCursor: number | undefined = undefined;
        let tags: Tag[] | undefined = undefined

        if (userId) {
            const userData = await ctx.prisma.user.findUnique({
                where: { id: userId },
                include: {
                    ineterest: true
                }
            });
            if (userData) {
                tags = userData.ineterest;
            }
        }



        const res = await ctx.prisma.collection.findMany({
            where: {
                title: search && {
                    contains: search,
                    mode: 'insensitive'
                },
                tags: tags && { some: { id: { in: tags.map(t => t.id) } } }
            },
            take: currenctTake,
            cursor: currentCursor ? { id: currentCursor } : undefined,
            include: {
                tags: true,
                saves: userId ? {where: {userId}} : undefined,
                createdBy: {
                    select: {
                        name: true,
                        email: true,
                        role: true,
                    }
                },
                _count: {
                    select: {
                        links: true,
                        saves: true
                    }
                }
            },
            orderBy: sort || {
                createdAt: 'desc',
                
            }
        })

        if (res.length >= take) {
            const lastResult = res.pop();
            if (lastResult) {
                nextCursor = lastResult.id
            }
        }
        return {
            items: res,
            nextCursor
        }
    }),

    save: protectedProcedure.input(z.object({ collectionId: z.number() })).mutation(async ({ ctx, input }) => {
        const { collectionId: id } = input
        const userId = ctx.session.user.id;
        try {
            const existingCollection = await ctx.prisma.collection.findUnique({
                where: { id: input.collectionId },
                include: {
                    saves: {
                        where: {
                            userId: ctx.session.user.id,
                            collectionId: id
                        }
                    }
                }
            });
            if (!existingCollection) throw new TRPCError({ code: 'NOT_FOUND', message: 'Collection not found!' })

            if (existingCollection.saves.length > 0) {
                console.log(existingCollection.saves)
                const raw = await ctx.prisma.$executeRaw`DELETE FROM "Save" WHERE "id"=${existingCollection.saves[0]?.id}`
                const res = await ctx.prisma.collection.findUnique({
                    where: { id: input.collectionId },
                    include: getCollectionInclude(userId)
                });
                return res;
            }
            const save = await ctx.prisma.save.create({
                data: {
                    userId,
                    collectionId: id
                }
            })
            const res = await ctx.prisma.collection.update({
                where: { id },
                data: {
                    saves: {
                        connect: {
                            id: save.id
                        }
                    }
                },
                include: getCollectionInclude(userId)
            })

            return res;
        } catch (error) {
            ServerErrorHandler(error);
        }
    }),

    infinitSavedCollection: protectedProcedure.input(z.object({
        take: z.number().int(),
        cursor: z.number().optional(),
    })).query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const take = input.take && input.take + 1 || ServerConfig.itemLimit + 1
        const currentCursor = input.cursor;
        let nextCursor: string | undefined = undefined;

        try {
            const res = await ctx.prisma.save.findMany({
                where: {
                    userId
                },
                take,
                cursor: currentCursor ? { id: currentCursor } : undefined,
                include: {
                    collection: {
                        include: getCollectionInclude(userId)
                    },
                }
            });


            if (res.length >= take) {
                const lastResult = res.pop();
                if (lastResult) {
                    nextCursor = `${lastResult.id}`
                }
            }
            return {
                items: res,
                nextCursor
            }
        } catch (error) {
            ServerErrorHandler(error);
        }
    }),
    // linkRelatedCollection: protectedProcedure.input(z.object({
    //     take: z.number().int(),
    //     cursor: z.string().optional(),
    //     targetLinkId: z.number()
    //   })).query(async ({ ctx, input }) => {
    //     const take = input.take && input.take + 1 || ServerConfig.itemLimit+1
    //     const currentCursor = input.cursor;
    //     let nextCursor: string|undefined = undefined;

    //     try {
    //         const res = await ctx.prisma.collection.findMany({
    //             where: {

    //             },
    //             take,
    //             cursor: currentCursor ? {id: parseInt(currentCursor) } : undefined,
    //             include: {
    //                 collection: {
    //                     include: getCollectionInclude(userId)
    //                 },
    //             }
    //         });


    //         if ( res.length >= take) {
    //             const lastResult = res.pop();
    //             if (lastResult) {
    //                 nextCursor = `${lastResult.id}`
    //             }
    //         }
    //         return {
    //             items: res,
    //             nextCursor
    //         }
    //     } catch (error) {
    //         ServerErrorHandler(error);
    //     }
    // }),

});
