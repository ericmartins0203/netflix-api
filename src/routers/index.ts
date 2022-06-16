import express, { Application } from "express"
import morgan from "morgan"
import errorHandler from "../middlewares/error-handler.middleware"

import showRouter from "./show.router"

const routes = [
  showRouter
]

function startRoutes (app: Application) {
  app.use(express.json())
  app.use(morgan('tiny'))

  app.use(routes)

  app.use(errorHandler)
}

export default startRoutes
