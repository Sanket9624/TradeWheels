// routes/imageUploadRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { uploadCarImages, getCarImages } = require('../Controllers/imageUploader.controller');

router.post('/upload/:carId', authMiddleware.authenticateToken,uploadCarImages);
router.get('/:carId', getCarImages); 

module.exports = router;
