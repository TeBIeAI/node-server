const { DataTypes } = require('sequelize')
const sequelize = require('../db')

var Vote = sequelize.define('vote', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
});


var Choice = sequelize.define('choice', {
  choiceTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  count: {
    type: DataTypes.INTEGER,
    length: 6
  }
});

Choice.belongsTo(Vote);
Vote.hasMany(Choice, { onUpdate: 'cascade' });

Vote.sync({ alter: true })
Choice.sync({ alter: true })
module.exports = {
  Vote,
  Choice
}