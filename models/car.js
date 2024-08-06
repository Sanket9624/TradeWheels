'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define('Car', {
    user_id: DataTypes.INTEGER,
    brand: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    variant: DataTypes.STRING,
    fuel_type: DataTypes.STRING,
    ownership: DataTypes.STRING,
    km_driven: DataTypes.INTEGER,
    price: DataTypes.DECIMAL,
    color: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    timestamps: true,
    paranoid: true, 
    tableName: 'Cars'
  });
  return Car;
};

