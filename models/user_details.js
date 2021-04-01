const { DataTypes } = require('sequelize');
const UserModel = require('./user')
const sequelize = require('../db');

var User_Detail_Model = sequelize.define(
  'userinfo',
  {
    username: {
      field: 'username',
      type: DataTypes.STRING,
      allowNull: true
    },
    uid: {
      type: DataTypes.INTEGER,
      unique: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 3
    },
  },

  {
    tableName: 'hc_user_details',
    freezeTableName: true,
    timestamps: true,
  }
)

User_Detail_Model.sync({ alter: true });
console.log("用户模型表刚刚(重新)创建！");


module.exports = User_Detail_Model;