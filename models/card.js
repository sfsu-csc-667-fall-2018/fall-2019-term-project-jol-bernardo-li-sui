'use strict';
module.exports = (sequelize, DataTypes) => {
  const card = sequelize.define('card', {
    type: DataTypes.STRING,
    color: DataTypes.STRING
  }, {});
  card.associate = function(models) {
    // associations can be defined here
  };
  return card;
};