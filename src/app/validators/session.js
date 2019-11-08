const Joi = require('@hapi/joi')

const schema = Joi.object({
  email: Joi.string().required().label('Email not provider and is required.'),
  password: Joi.number().required().label('Password not provider and is required.')

})

module.exports = (req, res, next) => {
  const { email, password } = req.body

  const { error } = schema.validate({ email, password })

  if (error) {
    const err = { ...error.details.map((msg, index) => ` ${index} : ${msg.context.label}`) }

    return res.status(400).json({ err })
  }

  return next()
}
