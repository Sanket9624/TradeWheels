const express = require('express');
const router = express.Router();
const carController = require('../Controllers/filterCar.controller');

// Route for filtering cars
router.get('/cars', carController.getFilteredCars);

module.exports = router;
