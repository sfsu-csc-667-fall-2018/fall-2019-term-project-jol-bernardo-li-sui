"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("card", ["deckId"], {
      type: "foreign key",
      name: "card_fkey_1",
      references: {
        table: "deck",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};