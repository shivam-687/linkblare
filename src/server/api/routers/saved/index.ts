import { InfiniteSavedCollectionList, SaveCollectionsSchema } from "~/schema/save.schema";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { ServerErrorHandler } from "../../error-handler/ServerErrorHandler";
import { TRPCError } from "@trpc/server";
import { getCollectionInclude } from "../collection/collectionInclude";

export const SaveRouter = createTRPCRouter({

    saveCollection: protectedProcedure.input(SaveCollectionsSchema).mutation(async ({ctx, input}) => {
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
                await ctx.prisma.$executeRaw`DELETE FROM "Save" WHERE "id"=${existingCollection.saves[0]?.id}`

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


    infinitSavedCollection: protectedProcedure.input(InfiniteSavedCollectionList).query(async ({ ctx, input }) => {
        const userId = ctx.session.user.id;
        const take = input.take+1
        const currentCursor = input.cursor;
        let nextCursor: number|undefined = undefined;

        try {
            const res = await ctx.prisma.save.findMany({
                where: {
                    userId
                },
                take,
                cursor: currentCursor ? {id: currentCursor } : undefined,
                include: {
                    collection: {
                        include: getCollectionInclude(userId)
                    },
                }
            });


            if ( res.length >= take) {
                const lastResult = res.pop();
                if (lastResult) {
                    nextCursor = lastResult.id
                }
            }
            return {
                items: res,
                nextCursor
            }
        } catch (error) {
            ServerErrorHandler(error);
        }
    })
})