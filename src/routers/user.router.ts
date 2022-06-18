import express from 'express'

import { UserController } from "../controllers"
import validationMiddleware from '../middlewares/validation.middleware'
import CreateUser from '../schemas/create-user.schema'

const userRouter = express.Router()

userRouter.post('/user', validationMiddleware(CreateUser), UserController.create)

export default userRouter
