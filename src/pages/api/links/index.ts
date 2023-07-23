import { Link } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod';
import { CreateLinkInputSchema, ListLinksSchema } from '~/schema/Link.schema';
import createLinkHandler from '~/server/api/routers/link/createLinkHandler';
import { prisma } from '~/server/db';




const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const input = ListLinksSchema.parse(req.body);
      const data = await prisma.link.findMany({
        where: {
          collectionId: input.collectionId
        }
      });
      return res.status(200).json({ data: data.map(d => ({ ...d, visits: d.visits.toString() })) })
    } catch (error: any) {
      console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: 'bad payload'
        })
      }
      return res.status(500).json({ message: 'Server error' })
    }
  }


  if (req.method === 'POST') {
    try {
      const input = CreateLinkInputSchema.parse(req.body);
      const result = await createLinkHandler(input, { prisma });
      return res.status(200).json({ data:{...result, visits: result?.visits.toString()}});
    } catch (error) {
      // console.log(error);
      if (error instanceof ZodError) {
        return res.status(400).json({
          message: error.message
        })
      }

      if(error instanceof TRPCError){
        res.status(400).json(error);
      }
      return res.status(500).json({ message: 'Server error' })
    }
  }

  return res.status(405);
}

export default handler