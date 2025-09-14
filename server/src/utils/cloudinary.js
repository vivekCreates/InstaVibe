import { v2 as cloudinary } from 'cloudinary';
import dotenv from "dotenv"

dotenv.config()

  // Configuration

  cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key:process.env.CLOUDINARY_API_KEY , 
    api_secret:process.env.CLOUDINARY_API_SECRET
});

 const uploadImageOnCloudinary = async(localFilePath) => {
  // console.log("api secret ",process.env.CLOUDINARY_API_SECRET)
 try {
     if (!localFilePath) {
       console.log("You dont have localFilePath in cloudinary")
     }
       // Upload an image

        const uploadResult = await cloudinary.uploader.upload(localFilePath)
         if (!uploadResult) {
           console.log("Your upload result is an empty in cloudinary")
         }
      //  console.log(`Your file is uploaded successfully ${uploadResult}`);
       return uploadResult
       
 } catch (error) {
    console.log("Some went wrong while uploading image on cloudinary : ",error.message)
 }  
    
}

export default uploadImageOnCloudinary