import express, { Application } from "express"
import morgan from "morgan"

import { errorHandler } from "../middlewares/error-handler.middleware"
import authRouter from "./auth.router"
import episodesRouter from "./episode.router"
import listRouter from "./list.router"
import showRouter from "./show.router"
import userRouter from "./user.router"

const routes = [
  showRouter,
  authRouter,
  userRouter,
  episodesRouter,
  listRouter
]

function startRoutes (app: Application) {
  app.use(express.json())
  app.use(morgan('tiny'))

  app.use(errorHandler)

  app.use(routes)
}

export default startRoutes
