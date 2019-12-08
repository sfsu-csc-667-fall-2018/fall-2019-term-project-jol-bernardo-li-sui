'use strict';
module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    gameName: DataTypes.STRING,
    chatId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {
    tableName: 'games'
  });
  Game.associate = function(models) {
    // associations can be defined here
  };
  return Game;
};