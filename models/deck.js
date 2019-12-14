'use strict';
module.exports = (sequelize, DataTypes) => {
  const Deck = sequelize.define('Deck', {
    currentCard: DataTypes.INTEGER,
    deckId: DataTypes.INTEGER,
    playerId: DataTypes.INTEGER
  }, {
    tableName: 'decks'
  });
  Deck.associate = function(models) {
    // associations can be defined here
  };
  return Deck;
};