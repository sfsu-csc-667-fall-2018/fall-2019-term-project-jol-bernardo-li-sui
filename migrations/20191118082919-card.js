"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("card", {
      playerCardId: {
        type: Sequelize.INTEGER,
        reference: { model: "player", key: "playerId" }
      },
      deckId: {
        type: Sequelize.INTEGER,
        reference: { model: "deck", key: "id" }
      },
      type: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
      },
      color: {
        type: Sequelize.STRING,
        unique: false,
        allowNull: true
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
