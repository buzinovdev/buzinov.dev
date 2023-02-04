import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const token = event.req.headers?.authorization
  if (token) {
    try {
      console.log('token - ', token.split(' ')[1])
      if (!token) {
        console.log("Токен не найден")
      }
      const decodedData = jwt.verify(token.split(' ')[1] as string, process.env.SECRET_KEY as string)
      event.context.auth = decodedData
    } catch (e) {
      console.log("Пользователь не авторизован - ", e)
    }
  } else {
    console.log('Токен не требуется')
  }
});