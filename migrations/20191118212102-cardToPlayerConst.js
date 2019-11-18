"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("card", ["playerCardId"], {
      type: "foreign key",
      name: "card_fkey_0",
      references: {
        table: "users",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};
