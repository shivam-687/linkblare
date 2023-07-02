import { type PrismaClient } from "@prisma/client";
import slugify from "slugify";

export default async function createOrUpdateTags (client: PrismaClient, tagNames: string[]) {
    const tags = [];
    for (const tagName of tagNames) {
        const tagSlug = slugify(tagName);
        const tag = await client.tag.upsert({
            where: {
                slug: tagSlug
            },
            create: {
                name: tagName,
                slug: tagSlug
            },
            update: {
                name: tagName,
                slug: tagSlug
            }
        });
        tags.push(tag);
    }

    return tags;
}