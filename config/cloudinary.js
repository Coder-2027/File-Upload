const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.cloudConnect = () => {
    try{
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        });
        console.log('Cloudinary Connected');
    }catch(err){
        console.error(err);
        console.log('Error connecting to cloudinary');
    }
}