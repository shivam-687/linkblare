import { type z } from 'zod';
import { type PrismaClient, type Link, type Prisma } from '@prisma/client';
import { DeleteLinkSchema } from '~/schema/Link.schema';
import { type Session } from 'next-auth';
import { getLinkInclude } from './linkInclude';

type UpdateOption = {
    prisma: PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    session: Session|null
}

const deleteLinkHandler = async (input: z.infer<typeof DeleteLinkSchema>, { prisma, session }: UpdateOption) => {
    const validatedInput = DeleteLinkSchema.parse(input);

    const { id } = validatedInput;

    const deletedLink = await prisma.link.delete({
        where: {id}
    })

    return deletedLink;
};

export default deleteLinkHandler;
