import express from 'express'

import { ListController } from "../controllers"
import validateAuthToken from '../middlewares/validate-token.middleware'

const listRouter = express.Router()

listRouter.get('/list', validateAuthToken, ListController.list)
listRouter.post('/list/:showId', validateAuthToken, ListController.addShow)
listRouter.delete('/list/:showId', validateAuthToken, ListController.removeShow)

export default listRouter
