import express from 'express'

import { UserController } from "../controllers"
import validateAuthToken from '../middlewares/validate-token.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import CreateUser from '../schemas/create-user.schema'

const userRouter = express.Router()

userRouter.post('/user', validationMiddleware(CreateUser), UserController.create)
userRouter.get('/me', validateAuthToken, UserController.me)

export default userRouter
