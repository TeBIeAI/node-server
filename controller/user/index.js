const UserModel = require('../../models/user')
const { encryption } = require('../../utils')
const jwt = require('../../config/jwt')
const User_Detail_Model = require('../../models/user_details')


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

    try {
      let findResult = await UserModel.findOne({
        where: {
          username
        }
      })
      if (!findResult) {
        this.register(username, pwd)

        findResult = await UserModel.findOne({
          where: {
            username
          }
        })
      }
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

}

module.exports = new User