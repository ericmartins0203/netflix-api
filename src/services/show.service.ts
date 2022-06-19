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
   * Retorna todos o show
   *
   * @returns Retorna todos o show
   *
   * @beta
   */
  list (): Promise<Show[]> {
    return this.showRepository.find()
  }

  /**
   * Recebe um id e retorna um show
   * @param id
   *
   * @returns Retorna um show
   *
   * @beta
   */
  async listOne (id: number): Promise<Show | null> {
    const show = await this.showRepository.findOne({ where: { id } })

    if (show) {
      console.log(show)
      return show
    }
    console.log('out')

    throw new NotFoundException(`The show id: ${id} not found`)
  }

  /**
   * Cria um show
   *
   * @returns O show criado
   *
   */
  create (show: Show) : Promise<Show> {
    return this.showRepository.save(show)
  }

  /**
   * Deleta um show por id
   * @param id
   *
   * @returns o show deletado
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
}

export default ShowService
