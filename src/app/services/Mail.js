const path = require('path')

const nodemailter = require('nodemailer')
const mailConfig = require('../../config/mail')

const hbs = require('nodemailer-express-handlebars')
const exphbs = require('express-handlebars')

const transport = nodemailter.createTransport(mailConfig)

const viewPath = path.resolve(__dirname, '..', 'views', 'emails')

transport.use('compile', hbs({
  viewEngine: exphbs.create({
    partialsDir: viewPath,
    defaultLayout: false
  }),
  viewPath,
  extName: '.hbs'
}))

module.exports = transport
