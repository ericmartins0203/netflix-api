import { Request, Response } from "express"
import HTTP_STATUS from "../enums/http-status.enums"
import { ShowService } from "../services"

const showService = new ShowService()

class ShowController {
  public static async list (request: Request, response: Response) {
    const shows = await showService.list()

    response.send(shows)
  }

  public static async listOne (request: Request, response: Response) {
    const { id } = request.params

    const show = await showService.listOne(Number(id))

    if (show) {
      response.json(show)
    }

    return response.status(HTTP_STATUS.NOT_FOUND).json(`Show ${id} not found`)
  }

  public static async create (request: Request, response: Response) {
    const show = request.body

    const createdShow = await showService.create(show)

    response.status(HTTP_STATUS.CREATED).json(createdShow)
  }

  public static async delete (request: Request, response: Response) {
  try {
      const { id } = request.params

      await showService.delete(+id)

      response.status(HTTP_STATUS.NO_CONTENT).json()
    } catch (e:any) {
      response.status(e.status).json(e.message)
    }
  }
}

export default ShowController
