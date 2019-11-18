"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("game", ["deckId"], {
      type: "foreign key",
      name: "game_fkey_1",
      references: {
        table: "deck",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};