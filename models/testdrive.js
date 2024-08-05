'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestDrive extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestDrive.init({
    car_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    scheduled_date: DataTypes.DATE,
    scheduled_time: DataTypes.TIME
  }, {
    sequelize,
    modelName: 'TestDrive',
  });
  return TestDrive;
};