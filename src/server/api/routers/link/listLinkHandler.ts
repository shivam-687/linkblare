import { type Prisma, type PrismaClient } from "@prisma/client"
import { type Session } from "next-auth"
import { createPaginator } from "prisma-pagination"
import { type z } from "zod"
import { type LinkOutput, type ListLinksSchema } from "~/schema/Link.schema"
import { ServerConfig } from "~/server/config"
import { getLinkInclude } from "./linkInclude"

type ListOption = {
    prisma: PrismaClient,
}

const paginate = createPaginator({ perPage: ServerConfig.itemLimit });

export const listLinkHandler = async (input: z.infer<typeof ListLinksSchema>, {prisma}: ListOption) => {
    const {pagination} = input
    const res = await paginate<LinkOutput, Prisma.LinkFindManyArgs>(prisma.link, {
        where: {
            collectionId: input.collectionId,
        },
        include: getLinkInclude()
    }, pagination);
    return res;
}
