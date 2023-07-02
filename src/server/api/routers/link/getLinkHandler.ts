import { type z } from 'zod';
import { type PrismaClient, type Link, type Prisma } from '@prisma/client';
import { GetLinkSchema } from '~/schema/Link.schema';
import { type Session } from 'next-auth';
import { TRPCError } from '@trpc/server';

type GetOption = {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    session: Session|null
}

const getLinkHandler = async (input: z.infer<typeof GetLinkSchema>, { prisma, session }: GetOption) => {
    const validatedInput = GetLinkSchema.parse(input);

    const { id } = validatedInput;

    const res = await prisma.link.findUnique({
        where: {id},
        include: {
            tags: true
        }
    })

    if(!res){
        throw new TRPCError({code: 'NOT_FOUND', message: 'Link Not Found'})
    }

    return res;
};

export default getLinkHandler;
