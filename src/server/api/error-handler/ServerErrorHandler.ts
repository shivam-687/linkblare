import { Prisma } from "@prisma/client";
import { TRPCError } from "@trpc/server"

const prismaErrorToTrpc = {
    "P2002": (error: Prisma.PrismaClientKnownRequestError) => {
        throw new TRPCError({
            message: error.message,
            cause: error.cause,
            code: 'CONFLICT'
        })
    }
}

export const ServerErrorHandler = (error: any) => {

    if(error instanceof Prisma.PrismaClientKnownRequestError ){
        const keys = Object.keys(prismaErrorToTrpc);
        if(keys.find(k => error.code === k)) return prismaErrorToTrpc[error.code as keyof typeof prismaErrorToTrpc](error)
        throw new TRPCError({
            code: 'BAD_REQUEST',
            cause: error.cause,
            message: error.message
        })
    }

    if(error instanceof Prisma.PrismaClientValidationError){
        throw new TRPCError({
            code: 'BAD_REQUEST',
            cause: error.cause,
            message: error.message
        })
    }

    if(error instanceof TRPCError){
        throw error;
    }

    throw new TRPCError({
        message: 'Something went wrong!',
        code: 'INTERNAL_SERVER_ERROR',
    });
}