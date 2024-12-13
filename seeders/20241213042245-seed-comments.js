'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Comments', [
      {
        content: 'I agree with this review!',
        userId: 1,
        reviewId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        content: 'Good points!',
        userId: 2,
        reviewId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  },
};
