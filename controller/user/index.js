const UserModel = require('../../models/user')
const { encryption } = require('../../utils')
const jwt = require('../../config/jwt')
const User_Detail_Model = require('../../models/user_details')
const { Vote, Choice } = require('../../models/test')


class User {
  constructor() { }
  register = async (name, password) => {
    let { username, id } = await UserModel.create({ username: name, password })
    await User_Detail_Model.create({
      username,
      uid: id
    })
  }

  login = async (req, res) => {
    const { username, password } = req.body
    const pwd = password
    try {
      if (!username) {
        throw Error('请填写用户名')
      } else if (!pwd) {
        throw Error('请填写密码')
      }
    } catch (error) {
      return res.send({
        code: -1,
        msg: error.message,
      })
    }
    console.log(111111);
    const one = await Vote.findByPk(1)
    const chosess = await one.getChoices()
    await chosess[0].update({ count: 300 })

    // Vote.findByPk(1)
    //   .then(function (vote) {

    //     return vote.getChoices()
    //   })
    //   .then(function (choices) {
    //     console.log(2222222222222, choices);

    //     return choices[0].update({ count: 120 })
    //   })
    //   .then(function (choice) {
    //     callback(null, choice);
    //   })
    //   .catch(function (err) {
    //     callback(err);
    //   });
    // res.send({
    //   msg: 'ok'
    // })
    return

    try {
      let findResult = await UserModel.findOne({
        where: {
          username
        }
      })
      if (!findResult) {
        await this.register(username, pwd)

        findResult = await UserModel.findOne({
          where: {
            username: username
          }
        })
        console.log(findResult);
      }
      console.log(findResult);
      const { password } = findResult
      const formPassword = encryption(pwd)
      if (formPassword !== password) throw new Error('密码错误')
      const user = {
        jti: 1,
        iss: 'gumt.top',
        user: username,
      }
      const token = await jwt.create_token(user)
      res.send({
        code: 200,
        msg: '登录成功',
        data: { token },
      })
    } catch (error) {
      return res.send({
        code: -1,
        msg: error.message,
      })
    }
  }

  getUsers = async (req, res) => {
    let { pageSize = 5, page = 1 } = req.query
    page *= 1
    pageSize *= 1
    try {
      const list = await UserModel.findAndCountAll({
        attributes: ['id', 'username', 'createdAt'],
        limit: pageSize,
        offset: (page - 1) * pageSize,
        include: {
          model: User_Detail_Model,
          attributes: ['role']
        }
      });
      res.send({
        code: 200,
        data: list,
        mag: '获取列表成功'
      })
    } catch (error) {
      res.send({
        code: -1,
        msg: error.message,
      })
    }
  }

  userInfo = async (req, res) => {
    const token = req.headers.authorization
    try {
      const vaild = await jwt.check_token(token)
      const { user } = vaild
      const findResult = await UserModel.findOne({
        attributes: ['id', 'username', 'createdAt'],
        where: {
          username: user
        }
      })

      if (!findResult) {
        throw new Error('异常操作')
      } else {
        return res.send({
          code: 200,
          msg: '查询用户信息成功',
          data: findResult,
        })
      }

    } catch (error) {
      res.send({
        code: -1,
        msg: error.message,
      })
    }
  }

  admin_info = async (req, res) => {
    const { id } = req.query
    console.log(id);
    try {
      const result = await User_Detail_Model.findAll({
        where: {
          uid: id
        }
      })
      if (result)
        res.send({
          code: 200,
          data: result,
          msg: '获取用户详情成功'
        })
    } catch (error) {
      res.send({
        code: -1,
        msg: error.msg
      })
    }

  }

  edit_user = async (req, res) => {
    const { username, uid, role } = req.body
    try {
      const result = await UserModel.update({
        username: username
      }, {
        where: { id: uid },
      })
      console.log(result, '----------');
      res.send({
        code: 200,
        msg: '修改成功'
      })
    } catch (error) {
      res.send({
        code: -1,
        msg: '修改用户失败'
      })
    }
  }

}

module.exports = new User