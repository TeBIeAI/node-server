const mysql = require('mysql')

const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'localhost',
	user: 'root',
	password: 'root',
	database: 'hc_users',
	multipleStatements: true, //是否允许执行多条sql语句
})

module.exports = {
	sqlQuery(sql, sqlArr) {
		return new Promise((resolve, reject) => {
			pool.getConnection((err, connection) => {
				if (err) reject(err)
				else {
					connection.query(sql, (err, result) => {
						if (err) {
							reject(err)
						} else {
							resolve(result)
						}
						connection.release()
					})
				}
			})
		})
	},
}
