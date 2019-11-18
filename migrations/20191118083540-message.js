"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("message", {
      chatId: {
        type: Sequelize.INTEGER,
        reference: { model: "chat", key: "id" }
      },
      messageUserId: {
        type: Sequelize.INTEGER,
        reference: { model: "user", key: "id" }
      },
      messageBody: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      time: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        allowNull: false
      }
    });
  },

  down: (queryInterface, Sequelize) => {}
};
