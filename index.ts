import 'dotenv/config'
import 'reflect-metadata'
import express from 'express'

import databaseInitialize from './src/infrastructure/database/data-source'
import startRoutes from './src/routers'

export const app: express.Application = express()

const PORT = process.env.PORT || 3000

databaseInitialize()
startRoutes(app)

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
