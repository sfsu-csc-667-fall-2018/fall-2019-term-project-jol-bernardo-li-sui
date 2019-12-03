'use strict';
module.exports = (sequelize, DataTypes) => {
  const chat = sequelize.define('chat', {
    chatName: DataTypes.STRING,
    gameId: DataTypes.INTEGER
  }, {});
  chat.associate = function(models) {
    // associations can be defined here
  };
  return chat;
};