"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("message", ["chatId"], {
      type: "foreign key",
      name: "message_fkey_0",
      references: {
        table: "chat",
        field: "id"
      }
    });
  },
  down: (queryInterface, Sequelize) => {}
};