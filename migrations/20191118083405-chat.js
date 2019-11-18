"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("chat", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      gameId: {
        type: Sequelize.INTEGER,
        reference: { model: "game", key: "id" }
      }
    });
  },

  down: (queryInterface, Sequelize) => {}
};
