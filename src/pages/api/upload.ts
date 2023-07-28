/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { NextApiRequest, NextApiResponse } from 'next'
import formidable, { type File } from 'formidable';
import cloudinary from '~/lib/cloudinary';

export const config = {
    api: {
        bodyParser: false,
    }
};

type ProcessedFiles = Array<[string, File]>;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let status = 200,
        resultBody: {status: string, message: string, data?: any} = { status: 'ok', message: 'Files were uploaded successfully', data: undefined };
    
    
    /* Get files using formidable */
    const files = await new Promise<ProcessedFiles | undefined>((resolve, reject) => {
        const form = formidable({});
        const files: ProcessedFiles = [];
        form.on('file', function (field, file) {
            files.push([field, file]);
        })
        form.on('end', () => resolve(files));
        form.on('error', err => reject(err));
        form.parse(req, () => {
            //
        });
    }).catch(e => {
        console.log(e);
        status = 500;
        resultBody = {
            status: 'fail', message: 'Upload error'
        }
    });

    console.log('called', files);
    if (files?.length) {
        const res = await cloudinary.v2.uploader.upload(files[0]?.[1].filepath||'', {});
        resultBody['data'] = res;
    }

    res.status(status).json(resultBody);
}

export default handler;