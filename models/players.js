'use strict';
module.exports = (sequelize, DataTypes) => {
  const players = sequelize.define('players', {
    score: DataTypes.INTEGER
  }, {});
  players.associate = function(models) {
    // associations can be defined here
  };
  return players;
};