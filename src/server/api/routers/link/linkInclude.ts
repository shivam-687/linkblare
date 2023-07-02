import { Prisma } from "@prisma/client";

export const LinkInclude: Prisma.LinkInclude = {
    tags: true
}


export function getLinkInclude(userId?: string){

    return LinkInclude;
}