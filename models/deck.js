'use strict';
module.exports = (sequelize, DataTypes) => {
  const deck = sequelize.define('deck', {
    remainingCards: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {});
  deck.associate = function(models) {
    // associations can be defined here
  };
  return deck;
};