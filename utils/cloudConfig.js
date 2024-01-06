import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wonderlust_Prod",
    allowedFormats: ["png", "jpg", "jpeg"],
  },
});

const destroy = cloudinary.uploader.destroy;
// Export 'cloudinary' and 'storage' separately
export { cloudinary, storage, destroy };
