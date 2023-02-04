const jwt = require('jsonwebtoken')
const generateAccessToken = (id, login) => {
  const payload = {id, login}
  return jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: "4h"})
}
module.exports = generateAccessToken