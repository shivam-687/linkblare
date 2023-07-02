import { type z } from 'zod';
import { type PrismaClient, type Link, type Prisma } from '@prisma/client';
import { GetLinkSchema, GetRelatedLinkSchema } from '~/schema/Link.schema';
import { type Session } from 'next-auth';
import { TRPCError } from '@trpc/server';

type GetOption = {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    session: Session|null
}

const relatedLinkHandler = async (input: z.infer<typeof GetRelatedLinkSchema>, { prisma, session }: GetOption) => {
    const validatedInput = GetRelatedLinkSchema.parse(input);
    const { targetLinkId: id } = validatedInput;
    const existingLink = await prisma.link.findUnique({
        where: {id},
        include: {
            tags: true
        }
    })
    const res = await prisma.link.findMany({
        where: {
            tags: {
                some: {
                    slug: {
                        in: existingLink?.tags.map(l => l.slug)
                    }
                }
            },
            id: {
                not: id
            }
        },
        include: {
            tags: true
        }
    })

    if(!res){
        throw new TRPCError({code: 'NOT_FOUND', message: 'Link Not Found'})
    }

    return res;
};

export default relatedLinkHandler;