const express = require('express');
const app = express();

const files = require('./routes/route');
const {dbConnect} = require('./config/database');
const {cloudConnect} = require('./config/cloudinary');

dbConnect();
cloudConnect();

app.use(express.json());
require('dotenv').config();

const PORT = process.env.PORT || 5000;

const fileupload = require('express-fileupload');
app.use(fileupload({
    useTempFiles : true, 
    tempFileDir : '/tmp/'
}));

app.use('/api/v1/upload', files);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});