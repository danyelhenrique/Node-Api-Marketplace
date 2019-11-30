const express = require('express')
const routes = express.Router()

const handle = require('express-async-handler')

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.get('/', (req, res) => res.json({ api: true }))

routes.post('/users', validators.user, handle(controllers.UserController.store))
routes.post('/sessions', validators.session, handle(controllers.SessionController.store))

routes.use(authMiddleware)
/**
 * Ads Routes
 */

routes.get('/ads', handle(controllers.AdController.index))
routes.get('/ads/:id', handle(controllers.AdController.show))
routes.post('/ads', validators.ad, handle(controllers.AdController.store))
routes.put('/ads/:id', validators.ad, handle(controllers.AdController.update))
routes.delete('/ads/:id', handle(controllers.AdController.destroy))

/**
 * end Ads Routes
 */

/**
  * Purchase Routes
  */

routes.post('/purchase', validators.purchase, handle(controllers.PurchaseController.store))
/**
 * end Purchase Routes
 */

/**
  * Route to debug and test sentry
  */

// routes.get('/debug-sentry', (req, res) => {
//   throw new TypeError('My Second Sentry error!')
// })
module.exports = routes
