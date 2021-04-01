const crypto = require('crypto')

function encryption(password) {
  const md5 = crypto.createHash('md5')
  const newpassword = md5.update(password).digest('hex')
  return newpassword
}

module.exports = {
  encryption
}