'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Items", [
      {
        name: "Item 1",
        description: "Description for Item 1",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Item 2",
        description: "Description for Item 2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Items", null, {});
  },
};
