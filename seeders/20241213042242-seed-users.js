'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash('password123', 10);
    const hashedPassword2 = await bcrypt.hash('password456', 10);
    const hashedPassword3 = await bcrypt.hash('password789', 10);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'testuser',
        email: 'testuser@example.com',
        password_hash: hashedPassword1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'john_doe',
        email: 'john@example.com',
        password_hash: hashedPassword2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'jane_doe',
        email: 'jane@example.com',
        password_hash: hashedPassword3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
