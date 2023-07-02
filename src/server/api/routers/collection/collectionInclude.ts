import { Prisma } from "@prisma/client";

export const CollectionInclude: Prisma.CollectionInclude = {
    tags: true,
    saves: undefined,
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
}

export function getCollectionInclude(userId?: string){
    const include = CollectionInclude;
    if(!userId) return include;
    include.saves = {
        where: {
            userId: userId
        }
    }
    return include;
}