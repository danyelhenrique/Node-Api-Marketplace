const nodemailter = require('nodemailer')
const mailConfig = require('../../config/mail')

const transport = nodemailter.createTransport(mailConfig)

module.exports = transport
