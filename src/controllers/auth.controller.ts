import { Request } from "express"
import { CustomResponse } from "../interfaces/custom-response.interface"
import { AuthService } from "../services"

const authService = new AuthService()

class AuthController {
  public static async login (request: Request, response: CustomResponse) {
    const { email, password } = request.body

    try {
      const authenticated = await authService.login(email, password)

      response.json(authenticated)
    } catch (e) {
      console.log(`Fail to login: ${JSON.stringify({ email })}`)

      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default AuthController
