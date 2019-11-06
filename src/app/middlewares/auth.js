const { promisify } = require('util')
const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ err: 'Token no provider.' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET_JWT)

    console.log(decoded)
    req.userId = decoded.id
    return next()
  } catch (error) {
    return res.status(401).json({ err: 'Invalid Token.' })
  }
}
