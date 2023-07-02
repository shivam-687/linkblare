import { z } from "zod";
import { WithSearch } from "./helpers/WithSearch";
import { WithSorting } from "./helpers/WithSorting";
import { type Prisma, type Tag, type User } from "@prisma/client";

export const ListTagSchema = z.object({
    take: z.number().default(50),
    cursor: z.number().optional()
})
.merge(WithSearch)
.merge(WithSorting)

export type TagSortInput = Prisma.TagOrderByWithRelationInput;

export const TagActionSchema = z.object({
    tagId: z.number(),
    action: z.enum(['SELECT','REMOVE','TOGGLE']).optional().default('TOGGLE')
})


export type UserTagData = Tag & {
    users: User[];
};
