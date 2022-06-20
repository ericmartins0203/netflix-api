import { Request } from "express"
import logger from "../infrastructure/logger/logger"
import { CustomResponse } from "../interfaces"
import { AuthService } from "../services"

const authService = new AuthService()
const winstonLogger = logger({ controller: "AuthController" })

class AuthController {
  public static async login (request: Request, response: CustomResponse) {
    const { email, password } = request.body

    try {
      const authenticated = await authService.login(email, password)
      response.json(authenticated)
    } catch (e) {
      winstonLogger.error(`Fail to login: ${JSON.stringify({ email })}`)

      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default AuthController
