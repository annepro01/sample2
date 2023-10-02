import dotenv from 'dotenv';
dotenv.config();
import cloudinaryPackage from "cloudinary";
import multer from "multer";
import {CloudinaryStorage} from "multer-storage-cloudinary"


//configure cloudinary
const cloudinary = cloudinaryPackage.v2;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_APIKEY,
    api_secret: process.env.CLOUDINARY_APISECRETKEY
})

//create storage engine for multer
const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg','png','jpeg'],
    params: {
        folder:"Ecommerce-api"
    }
});

//Init multer with storage engine

const upload = multer({
    storage:storage
})

export default upload;