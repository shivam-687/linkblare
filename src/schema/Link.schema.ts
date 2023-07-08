import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { Collection, Link, Prisma, Save, Tag } from "@prisma/client";
import { WithInfinitListSchema } from "./helpers/WithInfiniteList";


export const LinkTypeSchema = z.enum(['PAGE', 'ARTICLE', 'VIDEO'])

export const CreateLinkInputSchema = z.object({
    title: z.string(),
    url: z.string().url(),
    desc: z.string().optional(),
    image: z.string().optional(),
    favicon: z.string().optional(),
    type: LinkTypeSchema.default('PAGE').optional(),
    tags: z.array(z.string()).default([]),
    collectionId: z.number()
})

export const CreateManyLinkInputSchema = z.object({
    links: z.array(CreateLinkInputSchema).default([])
})

export type CreateLinkInput = z.TypeOf<typeof CreateLinkInputSchema>;

export const UpdateLinkSchema = z.object({
    id: z.number()
}).merge(CreateLinkInputSchema);

export type UpdateLinkInput = z.TypeOf<typeof UpdateLinkSchema>;


export const DeleteLinkSchema = z.object({
    id: z.number()
});

export const GetLinkSchema = z.object({
    id: z.number()
});

export const SaveToCollection = z.object({
    id: z.number(),
    collection: z.number()
})

export const ListLinksSchema = z.object({
    collectionId: z.number().optional()
})
.merge(WithPagination)
.merge(WithSorting)
.merge(WithSearch)

export const GolinkSchema = z.object({
    linkId: z.number()
})
export const InfiniteLinkListSchema = z.object({
    collectionId: z.number(),
    take: z.number().default(30),
    cursor: z.number().optional(),
    search: z.string().optional(),
})
.merge(WithSorting)

export const GetRelatedLinkSchema = z.object({
    targetLinkId: z.number(),
    take: z.number().default(10),
    cursor: z.number().optional(),
})


export const InfiniteSavedLinkListSchema = z.object({})
                                            .merge(WithInfinitListSchema)


export type LinkOutput = Link & {
    collection?: Collection | undefined;
    tags?: Tag[] | undefined;
}




