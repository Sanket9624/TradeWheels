module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Images', 'image_url', {
      type: Sequelize.TEXT, // or Sequelize.LONGTEXT if URLs are very long
      allowNull: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Images', 'image_url', {
      type: Sequelize.STRING(255), // Set to the previous length or appropriate length
      allowNull: false
    });
  }
};
