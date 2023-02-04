const User = require('../models/user.model.js')
const bcrypt = require('bcrypt')
const generateAccessToken = require('../services/generateAccessToken.js')
class authController {
  async login(req, res) {
    try {
      const {login, password} = req.body
      const user = await User.findOne({login})
      if (!user) {
        await User.create({login:'admin', password})
        await User.findOne({login})
        return res.json({status: 400, msgActive: true, msgType: 'warning', msg: 'Пользователь создан, повторите ввод данных', token: ''})
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Введен неверный пароль', token: ''})
      }
      const token = generateAccessToken(user._id, user.login)
      return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Авторизован', token: token,})
    } catch (e) {
      console.log(e)
      return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Ошибка во время аутентификации', token: ''})
    }
  }
}
module.exports = new authController()