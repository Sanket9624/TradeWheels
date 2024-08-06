const models = require('../models');

const sellCar = async (carDetails) => {
    return await models.Car.create(carDetails);
};

const getAllCars = async () => {
    return await models.Car.findAll({
        where: {
            deletedAt: null 
        }
    });
};

const getCarById = async (id) => {
    const car = await models.Car.findOne({
        where: {
            id,
            deletedAt: null 
        }
    });
    if (!car) {
        throw new Error('Car not found or has been Sold');
    }
    return car;
    
};

const getCarsByUserId = async (id) => {
    return await models.Car.findAll({
        where: {
            user_id: id,
            deletedAt: null 
        }
    });
};

const updateCar = async (id, updates) => {
    const car = await models.Car.findOne({
        where: {
            id,
            deletedAt: null 
        }
    });

    if (!car) {
        throw new Error('Car not found or has been Sold');
    }

    return await car.update(updates);
};

const deleteCarById = async (id) => {
    const car = await models.Car.findOne({
        where: {
            id,
            deletedAt: null 
        }
    });

    if (!car) {
        throw new Error('Car not found or has been Sold');
    }

    await car.destroy(); // Soft delete the car
    return car;
};

module.exports = {
    sellCar,
    getAllCars,
    getCarById,
    getCarsByUserId,
    updateCar,
    deleteCarById
};
