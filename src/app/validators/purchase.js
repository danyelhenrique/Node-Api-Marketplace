const Joi = require('@hapi/joi')

const schema = Joi.object({
  ad: Joi.string().required().label('Ad not provider and is required.'),
  content: Joi.string().required().label('Content not provider and provider.')

})

module.exports = (req, res, next) => {
  const { ad, content } = req.body

  const { error } = schema.validate({ ad, content })

  if (error) {
    const err = { ...error.details.map((msg, index) => ` ${index} : ${msg.context.label}`) }

    return res.status(400).json({ err })
  }

  return next()
}
