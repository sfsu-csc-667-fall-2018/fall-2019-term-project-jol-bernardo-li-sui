'use strict';
module.exports = (sequelize, DataTypes) => {
  const game = sequelize.define('game', {
    gameName: DataTypes.STRING,
    chatId: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER
  }, {});
  game.associate = function(models) {
    // associations can be defined here
  };
  return game;
};