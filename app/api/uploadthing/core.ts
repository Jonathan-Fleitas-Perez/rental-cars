import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

 
const f = createUploadthing();


const handleauth = async function() {
  const { userId } = await auth()
  if (!userId) 
    console.error("User not authenticated. Unable to upload.");
  
  return {userId};
}
 

export const ourFileRouter = {
    photo:f({image:{maxFileSize:"4MB",maxFileCount:1}}).middleware(()=>handleauth()).onUploadComplete(()=>{}), 
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;
