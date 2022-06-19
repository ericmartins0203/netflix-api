import { Request } from "express"

import HTTP_STATUS from "../enums/http-status.enums"
import { CustomResponse } from "../interfaces"
import { ShowService } from "../services"

const showService = new ShowService()

class ShowController {
  public static async list (request: Request, response: CustomResponse) {
    try {
      const shows = await showService.list()
      return response.send(shows)
    } catch (e) {
      return response.errorHandler && response.errorHandler(e)
    }
  }

  public static async listOne (request: Request, response: CustomResponse) {
    try {
      const { params: { id } } = request
      const shows = await showService.listOne(+id)

      return response.json(shows)
    } catch (e) {
      response.errorHandler && response.errorHandler(e)
    }
  }

  public static async create (request: Request, response: CustomResponse) {
    try {
      const shows = request.body

      const result = await showService.create(shows)

      return response.status(HTTP_STATUS.CREATED).json(result)
    } catch (e) {
      return response.errorHandler && response.errorHandler(e)
    }
  }

  public static async delete (request: Request, response: CustomResponse) {
    try {
      const { params: { id } } = request
      const shows = await showService.delete(+id)

      response.json(shows)
    } catch (e) {
      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default ShowController
