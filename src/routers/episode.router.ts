import express from 'express'

import { EpisodeController } from '../controllers'
import validateAuthToken from '../middlewares/validate-token.middleware'
import validationMiddleware from '../middlewares/validation.middleware'
import { CreateEpisode } from '../schemas'

const episodesRouter = express.Router()

episodesRouter.post('/episodes', validateAuthToken, validationMiddleware(CreateEpisode), EpisodeController.create)

export default episodesRouter
