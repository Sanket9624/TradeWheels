const express = require('express');
const sellCarController = require('../Controllers/sellCar.controller');
const authMiddleware = require('../middleware/authMiddleware');
const car = require('../models/car');
const router = express.Router();

router.post('/',authMiddleware.authenticateToken,sellCarController.sellCar);
router.get('/cars', sellCarController.getAllCars);
router.get('/cars/:id',sellCarController.getCarById); 
router.get('/user/cars',authMiddleware.authenticateToken, sellCarController.getCarsByUserId);
router.put('/cars/:id', authMiddleware.authenticateToken, sellCarController.updateCar); 
router.delete('/cars/:id', authMiddleware.authenticateToken, sellCarController.deleteCarById);

module.exports = router;