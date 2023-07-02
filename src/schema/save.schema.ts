import { z } from "zod";

export const SaveCollectionsSchema = z.object({
    collectionId: z.number()
});

export const InfiniteSavedCollectionList = z.object({
    take: z.number().int(),
    cursor: z.number().optional(),
    search: z.string().optional()
})