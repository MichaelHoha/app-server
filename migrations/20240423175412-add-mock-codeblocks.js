'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('code_blocks', [
      {
        title: 'Async Block',
        content: 'This is the content of the first code block.',
        participants_count: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Second Code Block',
        content: 'This is the content of the second code block.',
        participants_count: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Third Code Block',
        content: 'This is the content of the third code block.',
        participants_count: 0,
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        title: 'Fourth Code Block',
        content: 'This is the content of the fourth code block.',
        participants_count: 0,
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('code_blocks', null, {});
  }
};
