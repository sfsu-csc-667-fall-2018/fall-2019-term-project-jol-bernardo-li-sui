"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("game", ["chatId"], {
      type: "foreign key",
      name: "game_fkey_0",
      references: {
        table: "chat",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};