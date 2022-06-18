import express, { Application } from "express"
import morgan from "morgan"

import { errorHandler } from "../middlewares/error-handler.middleware"
import authRouter from "./auth.router"
import showRouter from "./show.router"
import userRouter from "./user.router"

const routes = [
  showRouter,
  authRouter,
  userRouter
]

function startRoutes (app: Application) {
  app.use(express.json())
  app.use(morgan('tiny'))

  app.use(routes)

  app.use(errorHandler)
}

export default startRoutes
