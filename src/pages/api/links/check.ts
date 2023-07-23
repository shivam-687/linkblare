import { Link } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError, z } from 'zod';
import { ListLinksSchema } from '~/schema/Link.schema';
import { prisma } from '~/server/db';

const CheckLinkExistsSchema = z.object({
  url: z.string(),
  collectionId: z.number()
})
 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET'){
    try {
      const input = CheckLinkExistsSchema.parse(req.body);
      const result = await prisma.link.findFirst({
        where: {
          collectionId: input.collectionId,
          url: input.url
        }
      })
      return res.status(200).json({data: result})
    } catch (error: any) {
      console.log(error);
      if(error instanceof ZodError){
        return res.status(400).json({
          message: 'bad payload'
        })
      }
      return res.status(500).json({message: 'Server error'})
    }
  }

  return res.status(405);
}
 
export default handler