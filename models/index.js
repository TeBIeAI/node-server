const { Sequelize } = require('sequelize');
const UserModel = require('./user.js')
const db = require('../db');


// 方法 2: 分别传递参数 (其它数据库)
const sequelize = new Sequelize('hc_users', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

UserModel.init(sequelize); // 初始化

db.sequelize = sequelize

module.exports = {
  db
}