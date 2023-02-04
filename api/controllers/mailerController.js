const nodemailer = require('nodemailer')
const transporter = nodemailer.createTransport({
  host: 'smtp.mail.ru',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
})
module.exports.contact = async (req, res) => {
  const {name, subject, email, message} = req.body
  let info = await transporter.sendMail({
    from: process.env.MAIL_USERNAME,
    to: 'buzinov.dev@yandex.ru',
    subject: subject,
    text: message,
    html: `Сообщение от ${name}. Email - ${email}<br><br><br>${message}`
  })
  if (info.messageId) {
    return res.json({status: 200, msgActive: true, msgType: 'success', msg: 'Письмо отправлено'})
  } else {
    return res.json({status: 400, msgActive: true, msgType: 'danger', msg: 'Письмо не отправлено'})
  }
}