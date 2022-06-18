import express from 'express'

import { ShowController } from "../controllers"
import validationMiddleware from '../middlewares/validation.middleware'
import CreateShow from '../schemas/create-show.schema'

const showRouter = express.Router()

showRouter.get('/show', ShowController.list)

showRouter.get('/show/:id', ShowController.listOne)

showRouter.post('/show', validationMiddleware(CreateShow), ShowController.create)

showRouter.delete("/show/:id", ShowController.delete)

export default showRouter
