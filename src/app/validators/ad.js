const Joi = require('@hapi/joi')

const schema = Joi.object({
  title: Joi.string().required().label('Title not provider and is required.'),
  description: Joi.string().required().label('Description not provider and provider.'),
  price: Joi.number().required().label('Price not provider and provider.')
})

module.exports = (req, res, next) => {
  const { title, description, price } = req.body

  const { error } = schema.validate({ title, description, price })

  if (error) {
    const err = { ...error.details.map((msg, index) => ` ${index} : ${msg.context.label}`) }

    return res.status(400).json({ err })
  }

  return next()
}
