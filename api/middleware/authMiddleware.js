const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (!token) {
      return res.json({
        status: 403,
        msgActive: true,
        msgType: 'danger',
        msg: 'Пользователь не авторизован',
        token: ''
      })
    }
    const decodedData = jwt.verify(token, process.env.SECRET_KEY)
    // @ts-ignore
    req.user = decodedData
    next()
  } catch (e) {
    console.log(e)
    return res.json({
      status: 403,
      msgActive: true,
      msgType: 'danger',
      msg: 'Пользователь не авторизован',
      token: ''
    })
  }
};