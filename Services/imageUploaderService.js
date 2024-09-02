const { S3Client, PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const { Upload } = require("@aws-sdk/lib-storage");
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const s3Client = require('../AWS/awsConfig');

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
});

const uploadToS3 = async (file, carId) => {
    if (!carId) {
        throw new Error('Car ID is required');
    }

    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: `Images/${carId}/${uuidv4()}-${file.originalname}`,
        Body: file.buffer,
        // ACL: 'public-read', // Ensure the object is readable
    };

    try {
        const upload = new Upload({
            client: s3Client,
            params: uploadParams,
        });

        await upload.done();
        
        // Generate a pre-signed URL for the uploaded image
        const getObjectParams = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: uploadParams.Key,
        };
        const signedUrl = await getSignedUrl(s3Client, new GetObjectCommand(getObjectParams)); 
        
        return signedUrl;
    } catch (err) {
        throw new Error(`Error uploading to S3: ${err.message}`);
    }
};

module.exports = { upload, uploadToS3 };
