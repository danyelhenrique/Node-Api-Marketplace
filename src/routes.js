const express = require('express')
const routes = express.Router()

const authMiddleware = require('./app/middlewares/auth')

const controllers = require('./app/controllers')
const validators = require('./app/validators')

routes.post('/users', validators.user, controllers.UserController.store)
routes.post('/sessions', validators.session, controllers.SessionController.store)

routes.use(authMiddleware)
/**
 * Ads Routes
 */

routes.get('/ads', controllers.AdController.index)
routes.get('/ads/:id', controllers.AdController.show)
routes.post('/ads', validators.ad, controllers.AdController.store)
routes.put('/ads/:id', validators.ad, controllers.AdController.update)
routes.delete('/ads/:id', controllers.AdController.destroy)

/**
 * end Ads Routes
 */

/**
  * Purchase Routes
  */

routes.post('/purchase', validators.purchase, controllers.PurchaseController.store)
/**
 * end Purchase Routes
 */

module.exports = routes
