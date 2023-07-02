import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { ServerErrorHandler } from "../error-handler/ServerErrorHandler";
import { CollectionOutput } from "~/schema/Collection.schema";
import { getCollectionInclude } from "./collection/collectionInclude";

export const UserRouter = createTRPCRouter({
    collectionFeed: protectedProcedure
    .input(z.object({
        take: z.number().default(30),
        cursor: z.number().optional(),
    }))
    .query(async ({ctx, input}) => {
        const {take, cursor} = input;
        let nextCursor: number|undefined = undefined;
        const user = ctx.session.user;

        const currentCursor = cursor ? {id: cursor} : undefined;
        const currentTake = take + 1;
        try {
            const userData = await ctx.prisma.user.findUnique({
                where: {id: user.id},
                include: {
                    ineterest: true
                }
            })

            // If user have interests
            if(userData?.ineterest && userData.ineterest.length > 0){
                const res = await ctx.prisma.collection.findMany({
                    where: {
                        tags: {
                            some: {
                                slug: {
                                    in: userData.ineterest.map(d => d.slug)
                                }
                            }
                        }
                    },
                    include: getCollectionInclude(user.id),
                    take: currentTake,
                    cursor: currentCursor,
                    orderBy: {id: 'desc'}
                });
                if ( res.length > take) {
                    const lastResult = res.pop();
                    if (lastResult) {
                        nextCursor = lastResult.id
                    }
                }
                return {
                    items: res,
                    nextCursor
                }
            }

            //  If user have no interest

            const res = await ctx.prisma.collection.findMany({
                
                include: getCollectionInclude(user.id),
                take: currentTake,
                cursor: currentCursor,
                orderBy: {saves: {_count: 'desc'}}
            });
            if ( res.length > take) {
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
    })
})