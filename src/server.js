const Sentry = require('@sentry/node')

const express = require('express')
const mongoose = require('mongoose')

const Youch = require('youch')

const databaseConfig = require('./config/database')
const sentryConfig = require('./config/sentry')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'production'

    this.sentry()
    this.database()
    this.middlewares()
    this.routes()
    this.exception()
  }

  sentry () {
    Sentry.init(sentryConfig)
  }

  database () {
    mongoose.connect(databaseConfig.uri, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  }

  middlewares () {
    this.express.use(Sentry.Handlers.requestHandler())
    this.express.use(express.json())
  }

  routes () {
    this.express.use(require('./routes'))
  }

  exception () {
    if (process.env.NODE_ENV === 'production') {
      this.express.use(Sentry.Handlers.errorHandler())
    }

    this.express.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV !== 'production') {
        const youch = new Youch(err, req)
        return res.json(await youch.toJSON())
      }
    })
  }
}

module.exports = new App().express
