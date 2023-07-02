import { type z } from 'zod';
import { type PrismaClient, type Link, type Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import slugify from 'slugify';
import { UpdateLinkSchema } from '~/schema/Link.schema';
import { type Session } from 'next-auth';
import { getLinkInclude } from './linkInclude';

type UpdateOption = {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    session: Session|null
}

const updateLinkHandler = async (input: z.infer<typeof UpdateLinkSchema>, { prisma, session }: UpdateOption) => {
    const validatedInput = UpdateLinkSchema.parse(input);

    const { id, url, collectionId, tags, ...rest } = validatedInput;

    const existingLink = await prisma.link.findUnique({
        where: {id},
        include: {
            tags: true,
        }
    })

    if(!existingLink) throw new TRPCError({message: 'Link not found', code: 'NOT_FOUND'});

    await prisma.link.update({
        where: {id},
        data: {
            tags: {
                disconnect: existingLink.tags.map((tag) => ({id: tag.id}))
            },
            collection: {
                
            }
        }
    })

    // update link
    const updatedLink = await prisma.link.update({
        where: {
            id
        },
        data: {
            ...rest,
            tags: {
                connectOrCreate: tags?.map((tagName) => {
                    const slug = slugify(tagName);
                    return {
                        where: { slug },
                        create: { name: tagName, slug },
                    }
                }),
            },
            collection: (existingLink.collectionId !== collectionId ) ? {
                connect: {
                    id: collectionId
                }
            }: undefined
        },

        include: getLinkInclude(session?.user.id)
    });

    return updatedLink;
};

export default updateLinkHandler;
