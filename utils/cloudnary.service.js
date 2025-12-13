import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_MACHINE,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_API,
});

export const uploadToCloudinary = async (filePath, folder = "blogs") => {
  return cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto"
  });
};
