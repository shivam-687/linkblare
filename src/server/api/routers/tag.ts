import { ListTagSchema, TagActionSchema } from "~/schema/Tag.schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { ServerErrorHandler } from "../error-handler/ServerErrorHandler";
import { ServerConfig } from "~/server/config";

export const TagRouter = createTRPCRouter({
    listAll: publicProcedure.input(ListTagSchema).query(async ({ ctx, input }) => {
        const currentTake = input.take && input.take + 1 || ServerConfig.itemLimit + 1
        const currentCursor = input.cursor;
        let nextCursor: number | undefined = undefined;
        try {

            const user = ctx.session?.user;
            const res = await ctx.prisma.tag.findMany({
                where: {
                    name: input.search ?
                        {
                            contains: input.search,
                            mode: 'insensitive'
                        }
                        : undefined
                },
                orderBy: input.sort || { users: { _count: 'desc' } },
                include: {
                    users: user ?
                        {
                            where: {
                                id: user.id
                            }
                        }
                        : false
                },
                take: currentTake,
                cursor: currentCursor ? { id: currentCursor } : undefined,
            });

            if (res.length >= input.take) {
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
            ServerErrorHandler(error)
        }
    }),

    interested: protectedProcedure.input(ListTagSchema).query(async ({ ctx, input }) => {
        const currentTake = input.take && input.take + 1 || ServerConfig.itemLimit + 1
        const currentCursor = input.cursor;
        let nextCursor: number | undefined = undefined;
        try {

            const user = ctx.session?.user;
            const res = await ctx.prisma.tag.findMany({
                where: {
                    
                    users: {
                        every: {
                            id: user.id
                        }
                    },
                    name: input.search ?
                        {
                            contains: input.search,
                            mode: 'insensitive'
                        }
                        : undefined
                },
                orderBy: input.sort || { id: 'asc' },
                include: {
                    users: user ?
                        {
                            where: {
                                id: user.id
                            }
                        }
                        : false
                },
                take: currentTake,
                cursor: currentCursor ? { id: currentCursor } : undefined,
            });

            if (res.length >= input.take) {
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
            ServerErrorHandler(error)
        }
    }),


    action: protectedProcedure.input(TagActionSchema).mutation(async ({ ctx, input }) => {
        const user = ctx.session.user;

        const Select = async () => {
            console.log("Select: ", user)
            return await ctx.prisma.tag.update({
                where: {
                    id: input.tagId,
                },
                data: {
                    users: {
                        connect: {
                            id: user.id
                        }
                    }
                },
                include: {
                    users: {
                        where: {
                            id: user.id
                        }
                    }
                }
            })
        };

        const Remove = async () => {
            console.log("Remove: ", user)
            return await ctx.prisma.tag.update({
                where: {
                    id: input.tagId,
                },
                data: {
                    users: {
                        disconnect: {
                            id: user.id
                        }
                    }
                },
                include: {
                    users: {
                        where: {
                            id: user.id
                        }
                    }
                }
            })
        };


        try {
            const alreadyExist = await ctx.prisma.tag.findUnique({
                where: {
                    id: input.tagId,
                },
                include: {
                    users: {
                        where: {
                            id: user.id
                        }
                    }
                }
            });


            const alreadySlected = alreadyExist?.users.find(u => u.id === user.id)

            console.log({ alreadySlected })

            if (input.action === 'SELECT') {
                if (alreadySlected) return alreadyExist;
                return await Select()
            }

            if (input.action === 'REMOVE') {
                return await Remove()
            }

            if (input.action === 'TOGGLE') {
                if (alreadySlected) return await Remove();
                return await Select();
            }

        } catch (error) {
            ServerErrorHandler(error)
        }
    })


})