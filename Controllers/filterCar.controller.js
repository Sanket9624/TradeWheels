const carService = require('../Services/filterCarService');

const getFilteredCars = async (req, res) => {
  try {
    const filters = req.query;
    const cars = await carService.getFilteredCars(filters);
    res.status(200).json({ cars });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cars', error: error.message });
  }
};

module.exports = { getFilteredCars };
