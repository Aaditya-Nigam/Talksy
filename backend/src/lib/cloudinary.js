const cloudinary=require("cloudinary")
const dotenv=require("dotenv")
const v2=cloudinary.v2 

dotenv.config();

v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API,
    secret_key: process.env.CLOUDINARY_CLOUD_SECRET
})

module.exports=v2