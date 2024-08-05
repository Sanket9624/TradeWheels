'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Car.init({
    user_id: DataTypes.INTEGER,
    number_plate: DataTypes.STRING,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    name: DataTypes.STRING,
    variant: DataTypes.STRING,
    fuel_type: DataTypes.STRING,
    ownership: DataTypes.STRING,
    km_driven: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    color: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};