import { UnauthorizedException } from "../exceptions"
import logger from "../infrastructure/logger/logger"
import { CustomRequest, CustomResponse } from "../interfaces"
import { ListService, UserService } from "../services"

const userService = new UserService()
const listService = new ListService()
const winstonLogger = logger({ controller: "ListController" })

class ListController {
  public static async list (req: CustomRequest, res: CustomResponse) {
    try {
      const email = req.decoded

      const user = await userService.getUserByEmail(email as string)

      if (!user) {
        winstonLogger.error(' Fail to return list : ', JSON.stringify(req.decoded))
        throw new UnauthorizedException()
      }

      const list = user.list

      return res.json(list)
    } catch (e) {
      console.log(`Fail to list user: ${JSON.stringify(req.decoded)}`)

      return res.errorHandler && res.errorHandler(e)
    }
  }

  public static async addShow (req: CustomRequest, res: CustomResponse) {
    try {
      const email = req.decoded
      const { showId } = req.params

      if (!email) {
        throw new UnauthorizedException()
      }

      const user = await userService.getUserByEmail(email)

      if (!user) {
        throw new UnauthorizedException()
      }

      const added = await listService.add(+showId, user)

      return res.json(added)
    } catch (e) {
      winstonLogger.error(`Fail to add show: ${JSON.stringify(req.decoded)}`)

      return res.errorHandler && res.errorHandler(e)
    }
  }

  public static async removeShow (req: CustomRequest, res: CustomResponse) {
    try {
      const email = req.decoded
      const { showId } = req.params

      if (!email) {
        throw new UnauthorizedException()
      }

      const user = await userService.getUserByEmail(email)

      if (!user) {
        throw new UnauthorizedException()
      }

      const removed = await listService.remove(+showId, user)

      return res.json(removed)
    } catch (e) {
      winstonLogger.error(`Fail to remove show: ${JSON.stringify(req.decoded)}`)

      return res.errorHandler && res.errorHandler(e)
    }
  }
}

export default ListController
