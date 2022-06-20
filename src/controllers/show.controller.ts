import { Request } from "express"

import HTTP_STATUS from "../enums/http-status.enums"
import logger from "../infrastructure/logger/logger"
import { CustomResponse } from "../interfaces"
import { EpisodeService, ShowService } from "../services"

const showService = new ShowService()
const episodeService = new EpisodeService()
const winstonLogger = logger({ controller: "ShowController" })

class ShowController {
  public static async list (request: Request, response: CustomResponse) {
    try {
      const shows = await showService.list()
      return response.send(shows)
    } catch (e) {
      winstonLogger.error(' Fail to list shows')
      return response.errorHandler && response.errorHandler(e)
    }
  }

  public static async listOne (request: Request, response: CustomResponse) {
    try {
      const { params: { id } } = request
      const shows = await showService.listOne(+id)

      return response.json(shows)
    } catch (e) {
      winstonLogger.error(' Fail to list shows: ', JSON.stringify(request.params.id))
      response.errorHandler && response.errorHandler(e)
    }
  }

  public static async create (request: Request, response: CustomResponse) {
    try {
      const shows = request.body

      const result = await showService.create(shows)

      return response.status(HTTP_STATUS.CREATED).json(result)
    } catch (e) {
      winstonLogger.error(' Fail to create shows: ', JSON.stringify(request.body))
      return response.errorHandler && response.errorHandler(e)
    }
  }

  public static async delete (request: Request, response: CustomResponse) {
    try {
      const { params: { id } } = request
      const shows = await showService.delete(+id)

      response.json(shows)
    } catch (e) {
      winstonLogger.error(' Fail to delete shows: ', JSON.stringify(request.params.id))
      response.errorHandler && response.errorHandler(e)
    }
  }

  public static async allEpisodes (request: Request, response: CustomResponse) {
    try {
      const { params: { id } } = request
      const episodes = await episodeService.episodes(+id)

      response.json(episodes)
    } catch (e) {
      winstonLogger.error(' Fail to list the episodes: ', JSON.stringify(request.params.id))
      response.errorHandler && response.errorHandler(e)
    }
  }
}

export default ShowController
