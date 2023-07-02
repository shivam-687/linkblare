import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";

export const CreateLinkSchema = z.object({
    title: z.string(),
    url: z.string(),
    desc: z.string(),
    fevicon: z.string().optional(),
    isArticle: z.string().optional(),
    tags: z.array(z.string()).default([]),
    collectionId: z.string().optional(),
})

export const UpdateLinkSchema = z.object({
    id: z.number()
}).merge(CreateLinkSchema);

export const DeleteLinkSchema = z.object({
    id: z.number()
})

export const GetLinkSchema = z.object({
    id: z.number()
})

export const ListLinks = z.object({})
                        .merge(WithPagination)
                        .merge(WithSorting)
                        .merge(WithSearch)