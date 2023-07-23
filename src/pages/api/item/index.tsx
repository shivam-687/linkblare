import { NextApiRequest, NextApiResponse } from 'next'

 

 
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  return res.status(200).json({data: 'Hello world'})
}
 
export default handler