import express from 'express'

import { ShowController } from "../controllers"
import validateAuthToken from '../middlewares/validate-token.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import CreateShow from '../schemas/create-show.schema'

const showRouter = express.Router()

showRouter.get('/shows', validateAuthToken, ShowController.list)

showRouter.get('/shows/:id', validateAuthToken, ShowController.listOne)

showRouter.post('/shows', validateAuthToken, validationMiddleware(CreateShow), ShowController.create)

showRouter.delete("/shows/:id", validateAuthToken, ShowController.delete)

export default showRouter
