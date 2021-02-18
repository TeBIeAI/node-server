const db = require('../../db')
const crypto = require('crypto')
const dtime = require('time-formater')

class Admin {
	constructor() {}

	register = async (req, res) => {
		const { username, password } = req.body
		try {
			if (!username || !password) {
				throw new Error('用户信息错误')
			}
		} catch (error) {
			res.send({
				code: -1,
				msg: error.message,
			})
			return
		}
		try {
			const sqlContent = `select * from hc_users where username="${username}"`
			const findResult = await db.sqlQuery(sqlContent)

			if (findResult.length) {
				res.send({
					code: -1,
					message: '该用户已经存在',
				})
			} else {
				const newpassword = this.encryption(password)
				const create_time = dtime().format('YYYY-MM-DD HH:mm')
				const sqlContent = `INSERT INTO hc_users.hc_users (username, password, create_time) VALUES ('${username}', '${newpassword}', '${create_time}')`
				console.log(sqlContent)
				await db.sqlQuery(sqlContent)
				res.send({
					code: 200,
					msg: '注册成功',
				})
			}
		} catch (error) {
			res.send({
				code: -1,
				message: '注册管理员失败',
			})
		}
	}

	login = async (req, res) => {
		const { username, password } = req.body
		try {
			if (!username) {
				throw Error('用户名异常')
			} else if (!password) {
				throw Error('密码异常')
			}
		} catch (error) {
			return res.send({
				code: -1,
				msg: error.message,
			})
		}

		try {
			const sqlContent = `select * from hc_users where username='${username}'`
			const findResult = await db.sqlQuery(sqlContent)
			const formPassword = this.encryption(password)

			console.log(findResult)
			if (!findResult.length) {
				throw new Error('用户名不存在')
			}
			if (formPassword !== findResult[0].password) throw new Error('密码错误')
			res.send({
				code: 200,
				msg: '登录成功',
			})
		} catch (error) {
			return res.send({
				code: -1,
				msg: error.message,
			})
		}
	}

	getUsers = async (req, res) => {
		const { pageSize = 5, p = 1 } = req.query
		const sqlContent = `select * from hc_users limit ${(p - 1) * pageSize}, ${pageSize}`
		try {
			const findResult = await db.sqlQuery(sqlContent)
			if (!findResult.length) throw new Error('查询失败')
			console.log(findResult)
			res.send({
				code: 200,
				msg: '查询用户列表成功',
				data: Array.from(findResult),
			})
		} catch (error) {
			res.send({
				code: -1,
				msg: error.message,
			})
		}
	}

	encryption = (password) => {
		var md5 = crypto.createHash('md5')
		var newpassword = md5.update(password).digest('hex')
		return newpassword
	}
}

module.exports = new Admin()
