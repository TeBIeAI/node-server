const express = require('express')
const router = express.Router()
const Admin = require('../controller/admin')

router.post('/register', Admin.register)
router.post('/login', Admin.login)
router.get('/getUsers', Admin.getUsers)
router.post('/userInfo', Admin.userInfo)

module.exports = router
