import { NextApiRequest, NextApiResponse } from 'next'
import { ZodError } from 'zod'
import { prisma } from '~/server/db'

 

 
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET'){
    try {
      const data = await prisma.collection.findMany();
      return res.status(200).json({data})
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