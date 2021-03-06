import { Repository } from "typeorm"

import { AppDataSource } from "../infrastructure/database/data-source"
import { Episode, Show } from "../entities"
import { BadRequestException } from "../exceptions"

type CreateEpisodeDTO = Omit<Episode, 'id'> & { showId: number }

class EpisodeService {
  private episodeRepository: Repository<Episode>
  private showRepository: Repository<Show>

  constructor () {
    this.episodeRepository = AppDataSource.getRepository(Episode)
    this.showRepository = AppDataSource.getRepository(Show)
  }

  async create (episode: CreateEpisodeDTO): Promise<Episode> {
    const { showId } = episode
    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequestException(`Show with id ${showId} not found`)
    }

    const alreadyExists = await this.episodeRepository.findOne({ where: { title: episode.title } })

    if (alreadyExists) {
      throw new BadRequestException(`Episode with title ${episode.title} already exists`)
    }

    const createEpisode = await this.episodeRepository.save(episode)

    show.episodes = [...show.episodes, createEpisode]

    await this.showRepository.save(show)

    return createEpisode
  }

  async episodes (showId: number): Promise<Episode[]> {
    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequestException(`Show with id ${showId} not found`)
    }

    return show.episodes
  }
}

export default EpisodeService
