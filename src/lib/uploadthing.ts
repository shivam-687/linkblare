import type { NextApiRequest, NextApiResponse } from "next";
 
import { createUploadthing, type FileRouter } from "uploadthing/next-legacy";
import { generateComponents } from "@uploadthing/react";
 

 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  imageUploader: f({ image: { maxFileSize: "4MB", } })
    .onUploadComplete( ({ metadata, file }) => {
      console.log("Upload complete ");
      console.log("file url", file.url);
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;

 
export const { UploadButton, UploadDropzone, Uploader } =
  generateComponents<OurFileRouter>();