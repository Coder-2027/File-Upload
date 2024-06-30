const fileInfo = require('../models/fileSchema');
const cloudinary = require('cloudinary').v2;

exports.localFileUpload = (req, res) => {
    try{
        console.log('hello');
        const file = req.files.file;
        console.log(file);

        const path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        file.mv(path, (err) => {
            console.error(err);
        })

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully'
        })
    }catch(err){
        console.log('Error uploading file');
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error uploading file'
        })
    }
}

function isSupported(fileType, supported){
    return supported.includes(fileType);
}

async function uploadFile(file, folder, quality){
    console.log(folder);
    const options = { folder };
    if(quality){
        options.quality = quality;
    }
    options.resource_type = "auto";

    // console.log(options);
    // console.log(file.tempFilePath);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.imageUpload = async (req, res) => {
    try{
        const { name, email, tags } = req.body;
        console.log(name);
        const file = req.files.file;

        const fileType = file.name.split('.')[1].toLowerCase();
        const supported = ['jpg', 'jpeg', 'png'];

        if(!isSupported(fileType, supported)){
            return res.status(500).json({
                success: false,
                message: 'File type not supported'
            })
        }
        const upload = await uploadFile(file, 'img');
        console.log(upload);

        const save = await fileInfo.create({
            name,
            email,
            tags,
            fileUrl: upload.secure_url
        })

        res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            image : upload.secure_url
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error uploading image'
        })
    }
}

exports.videoUpload = async (req, res) => {
    try{
        const { name, email, tags } = req.body;
        const video = req.files.video;

        const fileType = video.name.split('.')[1].toLowerCase();
        const supported = ['mp4', 'mov'];

        if(!isSupported(fileType, supported)){
            return res.status(500).json({
                success: false,
                message: 'File type not supported'
            })
        }
        // console.log('hello');

        const upload = await uploadFile(video, "video");
        console.log(upload);

        const saveVideo = await fileInfo.create({
            name, email, tags, fileUrl : upload.secure_url
        })

        res.status(200).json({
            success: true,
            message: 'Video uploaded successfully',
            video : upload.secure_url
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            error : err,
            success: false,
            message: 'Error uploading video'
        })
    }
}

exports.imageSizeReducer = async (req, res) => {
    try{
        const { name, email, tags } = req.body;
        const img = req.files.image;

        const fileType = img.name.split('.')[1];
        const supported = ['jpg', 'jpeg', 'png'];

        if(!isSupported(fileType, supported)){
            return res.status(500).json({
                success: false,
                message: 'File type not supported'
            })
        }

        const upload = await uploadFile(img, 'img', 30);

        const saveImg = await fileInfo.create({
            name, email, tags, fileUrl : upload.secure_url
        })

        res.status(200).json({
            success: true,
            message: 'Image size reduced successfully',
            img : upload.secure_url
        })
    }catch(err){
        console.error(err);
        res.status(500).json({
            success: false,
            message: 'Error uploading img'
        })
    }
}