'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'testuser',
        email: 'testuser@example.com',
        password_hash: 'hashed_password_here',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password_hash: 'hashed_password_1',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password_hash: 'hashed_password_2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
