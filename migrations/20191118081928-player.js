"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("player", {
      playerId: {
        type: Sequelize.INTEGER,
        reference: { model: "users", key: "id" }
      },
      chatId: {
        type: Sequelize.INTEGER,
        reference: { model: "chat", key: "id" }
      },
      gameId: {
        type: Sequelize.INTEGER,
        reference: { model: "game", key: "id" }
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      turn: {
        type: Sequelize.BOOLEAN
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.dropTable('users');
    */
  }
};
