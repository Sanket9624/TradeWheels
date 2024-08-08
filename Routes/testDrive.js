const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const { bookTestDriveController , getTestDrivesByUserIdController } = require('../Controllers/testDrive.controller');

// Endpoint to book a test drive
router.post('/book/:carId',authMiddleware.authenticateToken ,bookTestDriveController);

router.get('/user',authMiddleware.authenticateToken , getTestDrivesByUserIdController);

module.exports = router;
