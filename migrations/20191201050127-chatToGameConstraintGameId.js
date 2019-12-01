'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("chats", "gameId", {
      type: Sequelize.INTEGER,
      references: {
        model: 'games',
        key: 'id'
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'chat', 
      'gameId'
    );
  }
};
