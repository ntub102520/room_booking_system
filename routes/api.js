import express from 'express'
import * as apiUsersController from '../controllers/api/users.js'

const apiRouter = express.Router()

apiRouter.route('/users')
    .post(apiUsersController.registration)

export {
    apiRouter
}