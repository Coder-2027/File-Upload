const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
require('dotenv').config();

const fileInfo = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    fileUrl: {
        type: String,
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    }
})

fileInfo.post("save", async function (doc) {
    try{
        // console.log("document -> ", doc);

        const transporter = nodemailer.createTransport({
            host : process.env.HOST_NAME,
            port : 465,
            auth : {
                user : process.env.USER_NAME,
                pass : process.env.PASS_KEY
            }
        })

        console.log(transporter);

        const info = await transporter.sendMail({
            from : "mojij30102003@gmail.com",
            to : doc.email,
            subject : "File uploaded successfully",
            html : `<h1>File uploaded successfully on server</h1>`
        });

        console.log(info);
    }catch(error){
        console.error("Error sending email -> ", error);
        throw error;
    }
})

module.exports = mongoose.model('fileInfo', fileInfo);