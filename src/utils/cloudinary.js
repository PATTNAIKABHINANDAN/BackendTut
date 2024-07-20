import { v2 as cloudinary } from "cloudinary"
import { response } from "express";
import fs from "fs"



cloudinary.config({
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`,
    api_key: `${process.env.CLOUDINARY_API_KEY}`,
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const uploadCLoudinary = async (localFilePath) => {
    // console.log(`${process.env.CLOUDINARY_API_SECRET}`)
    try {
        if (!localFilePath){
            throw new Error("Local file path is required");
        }
        // console.log("local",localFilePath)
        // Upload file to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
        });

        console.log("File uploaded to Cloudinary");

        // Delete the local file after a successful upload
        if (fs.existsSync(localFilePath)) {
            // fs.unlinkSync(localFilePath);
            console.log("Local file deleted");
        }
        console.log(uploadResult);
        return uploadResult
    } catch (error) {
        console.error(`Error uploading to Cloudinary: ${error.message}`);

        // Delete the local file in case of an error
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
            console.log("Local file deleted after failed upload");
        }

        return null;
    }
};

export {uploadCLoudinary}