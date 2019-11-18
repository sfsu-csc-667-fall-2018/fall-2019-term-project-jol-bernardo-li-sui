"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("message", ["messageUserId"], {
      type: "foreign key",
      name: "message_fkey_1",
      references: {
        table: "users",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};