import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import { ServerErrorHandler } from "../error-handler/ServerErrorHandler";

export const SearchRouter = createTRPCRouter({
    search: publicProcedure.input(z.object({
        search: z.string().optional(),
        take: z.number().default(10),
        cursor: z.number().optional()
    })).query(async ({ctx, input}) => {
        const {search, take, cursor} = input;

        if(!search || search.trim() === ''){
            console.log('Invalid query');
            return {
                collections: [],
                links: [],
                tags: []
            }
        }
        try {
            const collections = await ctx.prisma.collection.findMany({
                where: {
                    title: {
                        contains: search,
                        mode: 'insensitive'
                    },
                },
                take,

                select: {
                    id: true,
                    title: true,
                    image: true,
                    _count: true
                }
            });

            const links = await ctx.prisma.link.findMany({
                where: {
                    OR: {
                        title: {
                            contains: search,
                            mode: 'insensitive'
                        },
                    },
                    
                },
                take,
                select: {
                    id: true,
                    title: true,
                    image: true,
                    _count: true
                }
            });
            const tags = await ctx.prisma.tag.findMany({
                where: {
                    name: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                take,
                select: {
                    id: true,
                    name: true
                }
            });

            return {
                tags,
                links,
                collections
            }
        } catch (error) {
            ServerErrorHandler(error)
        }
    })
});