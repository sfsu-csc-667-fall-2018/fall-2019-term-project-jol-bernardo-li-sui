"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("player", ["playerId"], {
      type: "foreign key",
      name: "player_fkey_0",
      references: {
        table: "users",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};
