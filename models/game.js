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
    Game.hasMany(models.Player, {
        foreignKey: "gameId"
    })
  };
  return Game;
};