const Joi = require('@hapi/joi')

const schema = Joi.object({
  name: Joi.string().required().label('Name not provider and is required.'),
  email: Joi.string().required().label('Email not provider and is required.'),
  password: Joi.number().required().min(6).label('Password not provider or is less than six characters.')

})

module.exports = (req, res, next) => {
  const { name, email, password } = req.body

  const { error } = schema.validate({ name, email, password })

  if (error) {
    const err = { ...error.details.map((msg, index) => ` ${index} : ${msg.context.label}`) }

    return res.status(400).json({ err })
  }

  return next()
}
