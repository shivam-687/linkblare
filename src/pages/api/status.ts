import { NextApiRequest, NextApiResponse } from 'next'

 
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if(req.method === 'GET'){
    return res.status(200).json({data: {
        status: true
    }})
  }

  return res.status(405);
}
 
export default handler