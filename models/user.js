const { DataTypes } = require('sequelize');
const sequelize = require('../db');
const { encryption } = require('../utils')
const User_Detail_Model = require('./user_details')

var UserModel = sequelize.define(
  'User',
  {
    username: {
      field: 'username',
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      set(val) {
        const newpassword = encryption(val)
        this.setDataValue("password", newpassword);
      },
    },
  },
  {
    tableName: 'hc_users',
    freezeTableName: true,
    timestamps: true,
  }
)
UserModel.hasOne(User_Detail_Model, { foreignKey: 'uid' })
User_Detail_Model.belongsTo(UserModel, {
  foreignKey: "username",
  targetKey: "username",
  onDelete: 'RESTRICT',
  onUpdate: 'RESTRICT'
});

UserModel.sync({ alter: true });
console.log("用户模型表刚刚(重新)创建！");


module.exports = UserModel;