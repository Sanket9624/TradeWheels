const carService = require('../Services/sellCarService');

const sellCar = async (req, res) => {
    const { id } = req.userData;
    const { brand, model, year, variant, fuel_type, ownership, km_driven, price, color } = req.body;

    if ( !id || !brand || !model || !year || !variant || !fuel_type || !ownership || !km_driven || !price || !color) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const carDetails = {
            user_id : id,
            brand,
            model,
            year,
            variant,
            fuel_type,
            ownership,
            km_driven,
            price,
            color
        };

        const newCar = await carService.sellCar(carDetails);
        res.status(201).json({ message: 'Car listed for sale successfully', car: newCar });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllCars = async (req, res) => {
    try {
        const cars = await carService.getAllCars();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get car by ID
const getCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const car = await carService.getCarById(id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get cars by user ID
const getCarsByUserId = async (req, res) => {
    const { id } = req.userData;
    try {
        const cars = await carService.getCarsByUserId(id);
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update car
const updateCar = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const updatedCar = await carService.updateCar(id, updates);
        res.status(200).json({ message: 'Car updated successfully', car: updatedCar });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete car by ID
const deleteCarById = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedCar = await carService.deleteCarById(id);
        res.status(200).json({ message: 'Car deleted successfully', car: deletedCar });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    sellCar,
    getAllCars,
    getCarById,
    getCarsByUserId,
    updateCar,
    deleteCarById
};