import { Request } from "express"

import HTTP_STATUS from "../enums/http-status.enums"
import { CustomResponse } from "../interfaces"
import { EpisodeService } from "../services"

const episodeService = new EpisodeService()

class EpisodeController {
  public static async create (req: Request, res: CustomResponse) {
    try {
      const { body } = req

      const createEpisode = await episodeService.create(body)

      res
      .status(HTTP_STATUS.CREATED)
      .json({ createEpisode })
    } catch (e) {
    return res.errorHandler && res.errorHandler(e)
  }
  }
}

export default EpisodeController
