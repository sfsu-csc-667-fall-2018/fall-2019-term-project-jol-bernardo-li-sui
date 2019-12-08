'use strict';
module.exports = (sequelize, DataTypes) => {
  const Card = sequelize.define('Card', {
    type: DataTypes.STRING,
    color: DataTypes.STRING
  }, {
    tableName: 'cards'
  });
  Card.associate = function(models) {
    // associations can be defined here
  };
  return Card;
};