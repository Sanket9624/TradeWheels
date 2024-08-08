const { Image, Car } = require('../models');
const { upload, uploadToS3 } = require('../Services/imageUploaderService');

const uploadCarImages = async (req, res) => {
    upload.array('images', 10)(req, res, async function (err) {
        if (err) {
            return res.status(400).json({ message: 'Error uploading images', error: err.message });
        }

        try {
            const carId = req.params.carId;

            // Check if car_id exists
            const carExists = await Car.findOne({ where: { id: carId, deletedAt: null } });
            if (!carExists) {
                return res.status(404).json({ message: 'Car ID not found' });
            }

            // Upload images and get URLs
            const imageUrls = await Promise.all(req.files.map(file => uploadToS3(file, carId)));

            // Save image URLs to the database
            const imagePromises = imageUrls.map(url => {
                return Image.create({ car_id: carId, image_url: url });
            });

            await Promise.all(imagePromises);

            res.status(200).json({ message: 'Images uploaded and saved successfully', imageUrls });
        } catch (error) {
            res.status(500).json({ message: 'Error saving image URLs to the database', error: error.message });
        }
    });
};

const getCarImages = async (req, res) => {
    try {
        const carId = req.params.carId;
        const carExist = await Car.findOne({ where: { id: carId , deletedAt : null } });
        if (!carExist) {
          return res.status(404).json({ message: 'Car not found' });
        }
    

        // Fetch images from the database
        const images = await Image.findAll({ where: { car_id: carId } });

        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching images', error: error.message });
    }
};

module.exports = {
    uploadCarImages,
    getCarImages,
};
