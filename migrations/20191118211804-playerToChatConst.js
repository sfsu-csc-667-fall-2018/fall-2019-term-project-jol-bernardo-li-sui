"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("player", ["chatId"], {
      type: "foreign key",
      name: "player_fkey_1",
      references: {
        table: "chat",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};
