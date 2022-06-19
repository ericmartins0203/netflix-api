import express from 'express'
import AuthController from "../controllers/auth.controller"

const authRouter = express.Router()

authRouter.post('/auth', AuthController.login)

export default authRouter
