import { Repository } from "typeorm"

import { AppDataSource } from "../infrastructure/database/data-source"
import { Show } from "../entities"
import NotFoundException from "../exceptions/not-found.exception"

class ShowService {
  private showRepository: Repository<Show>

  constructor () {
    this.showRepository = AppDataSource.getRepository(Show)
  }

   /**
   * Return all shows
   *
   * @returns Return all shows
   *
   * @beta
   */
  list (): Promise<Show[]> {
    return this.showRepository.find()
  }

  /**
   * receive id and return the show
   * @param id
   *
   * @returns Return the show
   *
   * @beta
   */
  async listOne (id: number): Promise<Show | null> {
    const show = await this.showRepository.findOne({ where: { id } })

    if (show) {
      console.log(show)
      return show
    }

    throw new NotFoundException(`The show id: ${id} not found`)
  }

  /**
   * Create show
   *
   * @returns return the show created
   *
   */
  async create (show: Show) : Promise<Show> {
    const alreadyExists = await this.showRepository.findOne({ where: { title: show.title } })

    if (alreadyExists) {
      throw new NotFoundException(`Show with title ${show.title} already exists`)
    }

    return this.showRepository.save(show)
  }

  /**
   * Delete show by id
   * @param id
   *
   * @returns the show deleted
   *
   * @beta
   */
  async delete (id: number) {
    const show = await this.showRepository.delete(id)

    if (show.affected) {
      return show
    }

    throw new NotFoundException(`O show id: ${id} não foi encontrado`)
  }

  async episodes (id: number) {
    const show = await this.showRepository.findOne({ where: { id } })

    if (show) {
      return show
    }

    throw new NotFoundException(`O show id: ${id} não foi encontrado`)
  }
}

export default ShowService
