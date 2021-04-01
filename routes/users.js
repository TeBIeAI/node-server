var express = require('express');
var router = express.Router();
const UserModel = require('../controller/user')

/* GET users listing. */
router.post('/login', UserModel.login);
router.post('/userInfo', UserModel.userInfo);
router.get('/getUsers', UserModel.getUsers);
router.get('/admin_info', UserModel.admin_info);
router.post('/edit_user', UserModel.edit_user);

module.exports = router;
