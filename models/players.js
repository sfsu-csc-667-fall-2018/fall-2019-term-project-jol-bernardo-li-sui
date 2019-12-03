'use strict';
module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER
  }, {});
  players.associate = function(models) {
    // associations can be defined here
  };
  return players;
};