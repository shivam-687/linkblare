import { z } from "zod";

export const WithInfinitListSchema = z.object({
    take: z.number().optional(),
    cursor: z.record(z.unknown()).optional()
});


export type WithInfinitListType = z.TypeOf<typeof WithInfinitListSchema>;
