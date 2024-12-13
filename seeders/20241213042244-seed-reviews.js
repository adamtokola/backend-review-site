'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Reviews', [
      {
        content: 'Great item!',
        rating: 5,
        userId: 1,
        itemId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Not bad.',
        rating: 3,
        userId: 2,
        itemId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Reviews', null, {});
  },
};
