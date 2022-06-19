import { Repository } from "typeorm"
import winston from "winston"

import { AppDataSource } from "../infrastructure/database/data-source"
import { Episode, Show } from "../entities"
import { BadRequestException } from "../exceptions"
import logger from "../infrastructure/logger/logger"

type CreateEpisodeDTO = Omit<Episode, 'id'> & { showId: number }

class EpisodeService {
  private episodeRepository: Repository<Episode>
  private showRepository: Repository<Show>
  private logger: winston.Logger

  constructor () {
    this.episodeRepository = AppDataSource.getRepository(Episode)
    this.showRepository = AppDataSource.getRepository(Show)
    this.logger = logger()
  }

  async create (episode: CreateEpisodeDTO): Promise<Episode> {
    const { showId } = episode
    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequestException(`Show with id ${showId} not found`)
    }

    const createEpisode = await this.episodeRepository.save(episode)

    show.episodes = [...show.episodes, createEpisode]

    await this.showRepository.save(show)

    return createEpisode
  }
}

export default EpisodeService
