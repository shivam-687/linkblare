/* eslint-disable prefer-const */
import { type z } from 'zod';
import { type PrismaClient, type Prisma } from '@prisma/client';
import { CreateLinkInputSchema } from '~/schema/Link.schema';
import { TRPCError } from '@trpc/server';
import slugify from 'slugify';
import { getLinkInclude } from './linkInclude';
import { ServerErrorHandler } from '../../error-handler/ServerErrorHandler';
import updateLinkHandler from './updateLinkHandler';

type CreateOption = {
    prisma: PrismaClient,
}

const createLinkHandler = async (input: z.infer<typeof CreateLinkInputSchema>, { prisma }: CreateOption) => {
    const validatedInput = CreateLinkInputSchema.parse(input);
    const { url, collectionId, tags, ...rest } = validatedInput;
    // Check if the same URL link is created but not in the same collectionId
    const existingLink = await prisma.link.findFirst({
        where: {
            url,
            collectionId
        }
    });

    // if (existingLink) {
    //     throw new TRPCError({ message: 'Link already exists', code: 'BAD_REQUEST' });
    // }
    try {

       
        // Create a new link
        const createdLink = await prisma.link.create({
            data: {
                ...rest,
                url,
                collection: {
                    connect: { id: collectionId },
                },
                tags: {
                    connectOrCreate: tags?.map((tagName) => {
                        const slug = slugify(tagName);
                        return {
                            where: { slug },
                            create: { name: tagName, slug },
                        }
                    }),
                },
            },

            include: getLinkInclude()
        });
        return createdLink;
    } catch (error) {
        ServerErrorHandler(error);
    }

};

export default createLinkHandler;
