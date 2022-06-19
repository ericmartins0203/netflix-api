import { Request } from "express"

import HTTP_STATUS from "../enums/http-status.enums"
import logger from "../infrastructure/logger/logger"
import { CustomResponse } from "../interfaces"
import { EpisodeService } from "../services"

const episodeService = new EpisodeService()
const winstonLogger = logger({ controller: "EpisodeController" })

class EpisodeController {
  public static async create (req: Request, res: CustomResponse) {
    try {
      const { body } = req

      const createEpisode = await episodeService.create(body)

      res
      .status(HTTP_STATUS.CREATED)
      .json({ createEpisode })
    } catch (e) {
      winstonLogger.error(' Fail to create episode: ', JSON.stringify(req.body))
    return res.errorHandler && res.errorHandler(e)
  }
  }
}

export default EpisodeController
