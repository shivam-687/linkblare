/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Button } from 'antd';
import { CldUploadWidget } from 'next-cloudinary';
import { MouseEvent } from 'react';

export type FileUploadResponse = {
    url: string
}

export type FileUploadProps = {
    onUpload?: (res: FileUploadResponse) => void
}

export default function FileUpload({
    onUpload
}: FileUploadProps) {
    return (
        <CldUploadWidget uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET} onUpload={(result: any, widget: any) => onUpload?.({url: result.info.url as string})
        }>
            {({ open  }) => {
                function handleOnClick(e: MouseEvent) {
                    e.preventDefault();
                    open();
                }
                return (
                    <Button onClick={handleOnClick}>
                        Upload
                    </Button>
                );
            }}
        </CldUploadWidget>
    )
}