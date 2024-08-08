const { Car, Sequelize } = require('../models');
const { Op } = Sequelize;

const getFilteredCars = async (filters) => {
  try {
    // Initialize query options
    const queryOptions = {
      where: {
        deletedAt: null // Ensure you're only fetching non-deleted cars
      }
    };

    // Apply filters
    if (filters.brand) {
      queryOptions.where.brand = filters.brand;
    }

    if (filters.ownership) {
      queryOptions.where.ownership = filters.ownership;
    }

    if (filters.color) {
      queryOptions.where.color = filters.color;
    }

    if (filters.fuel_type) {
      queryOptions.where.fuel_type = filters.fuel_type;
    }

    if (filters.price_min || filters.price_max) {
      queryOptions.where.price = {};
      if (filters.price_min) queryOptions.where.price[Op.gte] = filters.price_min;
      if (filters.price_max) queryOptions.where.price[Op.lte] = filters.price_max;
    }

    if (filters.km_driven) {
      queryOptions.where.km_driven = { [Op.lte]: filters.km_driven };
    }

    // Remove empty filters
    Object.keys(queryOptions.where).forEach(key => {
      if (queryOptions.where[key] === '' || queryOptions.where[key] === undefined) {
        delete queryOptions.where[key];
      }
    });

    const cars = await Car.findAll(queryOptions);
    return cars;
  } catch (error) {
    throw new Error(`Error fetching cars: ${error.message}`);
  }
};

module.exports = { getFilteredCars };
