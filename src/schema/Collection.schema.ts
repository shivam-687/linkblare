import { Collection, Prisma, Roles, Save, Tag, } from "@prisma/client";
import { z } from "zod";
import { WithPagination } from "./helpers/WithPagination";
import { WithSorting, sortDirection } from "./helpers/WithSorting";
import { WithSearch } from "./helpers/WithSearch";
import { WithInfinitListSchema } from "./helpers/WithInfiniteList";

export const CollectionFilter = z.object({
    tags: z.array(z.string()).optional()
})

export const CreateCollectionSchema = z.object({
    title: z.string(),
    desc: z.string(),
    image: z.string().optional(),
    tags: z.array(z.string()).default([]),
});

export type CreateCollectionInput = z.TypeOf<typeof CreateCollectionSchema>;

export const UpdateCollectionSchema = z.object({
    id: z.number()
}).merge(CreateCollectionSchema);
export type UpdateCollectionInput = z.TypeOf<typeof UpdateCollectionSchema>;

export const DeleteCollectionSchema = z.object({
    id: z.number()
});

export const GetCollectionSchema = z.object({
    id: z.number()
});

export const ListCollectionSchema = z.object({})
                                    .merge(WithPagination)
                                    .merge(WithSorting)
                                    .merge(WithSearch)
                                    .merge(
                                        z.object({filter: CollectionFilter.optional()})
                                    );

export type ListCollectionInput = z.TypeOf<typeof ListCollectionSchema>;

export const SearchCollectionSchema = WithSearch
                                    .merge(WithPagination)
export type SearchCollectionInput = z.TypeOf<typeof SearchCollectionSchema>;

export const UserCollectionFeedSchema = z.object({
                                cursor: z.number().optional(),
                                take: z.number().optional().default(10)
                                })
                                .merge(WithSorting)
                                .merge(WithSearch)
                                

export type CollectionOutput = Collection & {
    tags: Tag[]| undefined;
    saves: Save[]|undefined;
    _count: {
        links: number;
        saves: number;
    };
    createdBy: {
        name: string | null;
        email: string | null;
        role: Roles;
    };
}

export type CollectionSortType = Prisma.CollectionOrderByWithRelationInput

export const InfiniteSavedCollectionListSchema = z.object({})
                                            .merge(WithInfinitListSchema)
                                            .merge(WithSorting)

export type SavedCollectionOutput = Save & {
    collection: CollectionOutput;
}






