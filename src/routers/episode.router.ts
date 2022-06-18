import express from 'express'
import { EpisodeController } from '../controllers'
import validationMiddleware from '../middlewares/validation.middleware'
import { CreateEpisode } from '../schemas'

const EpisodesRouter = express.Router()

EpisodesRouter.post('/episodes', validationMiddleware(CreateEpisode), EpisodeController.create)

export default EpisodesRouter
