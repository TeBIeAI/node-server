const jwtoken = require('jsonwebtoken')
const secret = 'dsadsadsadwadwacasc;dsa'
const jwt = {
	async create_token(obj) {
		const token = await jwtoken.sign(obj, secret, { expiresIn: 60 * 60 })
		return token
	},
	async check_token(token) {
		const valid = await jwtoken.verify(token, secret)
		return valid
	},
}

module.exports = jwt
