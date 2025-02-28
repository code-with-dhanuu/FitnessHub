import { v2 as cloudinary } from "cloudinary"
import fs, { chownSync } from "fs"  // file system (it helps to read write remote )

import dotenv from "dotenv"
dotenv.config()

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Uploadoncloudinary = async (localfilepath) =>{  //url of locafilepath image 
try{ 
    if(!localfilepath){
        console.log("could not file path")
    }
  const uploadData = await cloudinary.uploader.upload(localfilepath,{
        resource_type:"auto"  //it checks  file type like (img,video,pdf)
    })
    console.log(uploadData.secure_url," file has been upload successfully")
    return uploadData.secure_url
}
catch(e){
    fs.unlinkSync(localfilepath) // it delete the uploaded file which is stored in local 
    console.log(e)
}
}

export default Uploadoncloudinary;