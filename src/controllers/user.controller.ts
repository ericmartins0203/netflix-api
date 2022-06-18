import { Request } from "express"
import HTTP_STATUS from "../enums/http-status.enums"
import { CustomResponse } from "../interfaces/custom-response.interface"
import { UserService } from "../services"

const userService = new UserService()

class UserController {
  public static async create (request: Request, response: CustomResponse) {
    const { body } = request

    try {
      const user = await userService.create(body)

      response.status(HTTP_STATUS.CREATED).json({ id: user.id, email: user.email })
    } catch (e) {
      console.log(' Fail to create user: ', JSON.stringify(body.email))
    }
  }
}

export default UserController
