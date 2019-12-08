'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    messageBody: DataTypes.TEXT,
    time: DataTypes.DATE,
    chatId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    tableName: "messages"
  });
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};