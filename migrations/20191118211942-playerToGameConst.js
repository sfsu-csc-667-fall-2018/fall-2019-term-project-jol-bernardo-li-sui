"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("player", ["gameId"], {
      type: "foreign key",
      name: "player_fkey_2",
      references: {
        table: "game",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};
