"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("chat", ["gameId"], {
      type: "foreign key",
      name: "chat_fkey_0",
      references: {
        table: "game",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};