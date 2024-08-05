'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      number_plate: {
        type: Sequelize.STRING
      },
      brand: {
        type: Sequelize.STRING
      },
      model: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      variant: {
        type: Sequelize.STRING
      },
      fuel_type: {
        type: Sequelize.STRING
      },
      ownership: {
        type: Sequelize.STRING
      },
      km_driven: {
        type: Sequelize.INTEGER
      },
      price: {
        type: Sequelize.DECIMAL
      },
      color: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  }
};