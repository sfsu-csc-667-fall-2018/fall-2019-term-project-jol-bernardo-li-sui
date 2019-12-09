'use strict';
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    score: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    chatId: DataTypes.INTEGER,
    gameId: DataTypes.INTEGER,
    turn: DataTypes.BOOLEAN,
    score: DataTypes.INTEGER
  }, {
    tableName: 'players'
  });
  Player.associate = function(models) {
    // associations can be defined here
  };
  return Player;
};