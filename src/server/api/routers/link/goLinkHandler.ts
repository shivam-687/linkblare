import { type z } from 'zod';
import { type PrismaClient, type Link, type Prisma } from '@prisma/client';
import { GetLinkSchema, GolinkSchema } from '~/schema/Link.schema';
import { type Session } from 'next-auth';
import { TRPCError } from '@trpc/server';

type GoOption = {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    session: Session|null
}

const goLinkHandler = async (input: z.infer<typeof GolinkSchema>, { prisma, session }: GoOption) => {
    const validatedInput = GolinkSchema.parse(input);

    const { linkId: id } = validatedInput;

    const res = await prisma.link.findUnique({
        where: {id},
        include: {
            tags: true
        }
    })

    if(!res){
        throw new TRPCError({code: 'NOT_FOUND', message: 'Link Not Found'})
    }

    await prisma.link.update({
        where: {id},
        data: {
            visits: {
                increment: 1
            }
        }
    })

    return res;
};

export default goLinkHandler;
