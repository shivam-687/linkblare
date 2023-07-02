import { type PrismaClient } from "@prisma/client"
import { type z } from "zod"
import { InfiniteLinkListSchema } from "~/schema/Link.schema"


type ListOption = {
    prisma: PrismaClient,
}


export const infinitLinkListHandler = async (input: z.infer<typeof InfiniteLinkListSchema>, {prisma}: ListOption) => {
    const validatedInput = InfiniteLinkListSchema.parse(input)
    const {take, cursor, collectionId, search, sort} = validatedInput;
    const currentCursor = cursor ? {id: cursor} : undefined;
    let nextCursor: number|undefined = undefined
    const currentTake = take+1;


    const res = await prisma.link.findMany({
        where: {
            collectionId,
            title: search && {
                contains: search,
                mode: 'insensitive' 
            },
            OR: search ? {
                url: {
                    contains: search,
                    mode: 'insensitive'
                }
            }: undefined,
        },

        take: currentTake,
        cursor: currentCursor,
        orderBy: sort || {createdAt: 'desc'},
        include: {
            tags: true
        }
    })

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
