const { Sequelize } = require('sequelize');
const { dbconfig } = require('../config/config')

const sequelize = new Sequelize(dbconfig.database, dbconfig.username, dbconfig.password, {
	host: dbconfig.host,
	port: '3306',
	dialect: 'mysql', /* 选择 'mysql' | 'mariadb' | 'postgres' | 'mssql' 其一 */
});

module.exports = sequelize;