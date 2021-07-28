'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Ressourses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        allowNull: true,
        type: Sequelize.STRING
      },
      movie: {
        allowNull: true,
        type: Sequelize.STRING
      },
      project: {
        allowNull: false,
        type: Sequelize.STRING
      },
      parcour: {
        allowNull: false,
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Ressourses');
  }
};