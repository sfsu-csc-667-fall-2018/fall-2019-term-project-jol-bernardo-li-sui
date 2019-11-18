"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("game", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      chatId: {
        type: Sequelize.INTEGER,
        reference: { model: "chat", key: "id" }
      },
      deckId: {
        type: Sequelize.INTEGER,
        reference: { model: "deck", key: "id" }
      }
    });
  },

  down: (queryInterface, Sequelize) => {}
};
