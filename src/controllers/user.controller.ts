import { Request } from "express"
import HTTP_STATUS from "../enums/http-status.enums"
import logger from "../infrastructure/logger/logger"
import { CustomRequest, CustomResponse } from "../interfaces"
import { UserService } from "../services"

const userService = new UserService()
const winstonLogger = logger({ controller: "UserController" })

class UserController {
  public static async create (request: Request, response: CustomResponse) {
    const { body } = request

    try {
      const user = await userService.create(body)

      response.status(HTTP_STATUS.CREATED).json({ id: user.id, email: user.email })
    } catch (e) {
      console.log(' Fail to create user: ', JSON.stringify(body.email))
      response.errorHandler && response.errorHandler(e)
    }
  }

  public static async me (request: CustomRequest, response: CustomResponse) {
    try {
      const email = request.decoded

      response.status(HTTP_STATUS.CREATED).json({ email })
    } catch (e) {
      winstonLogger.error(' Fail to return user email', JSON.stringify(request.decoded))

      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default UserController
