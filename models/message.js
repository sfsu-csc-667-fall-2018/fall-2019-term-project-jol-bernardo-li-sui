'use strict';
module.exports = (sequelize, DataTypes) => {
  const message = sequelize.define('message', {
    messageBody: DataTypes.TEXT,
    time: DataTypes.DATE
  }, {});
  message.associate = function(models) {
    // associations can be defined here
  };
  return message;
};