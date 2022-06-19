import { Repository } from "typeorm"
import { AppDataSource } from "../infrastructure/database/data-source"
import { Show, User } from "../entities"
import { BadRequestException } from "../exceptions"

class ListService {
  userRepository: Repository<User>
  showRepository: Repository<Show>

  constructor () {
    this.userRepository = AppDataSource.getRepository(User)
    this.showRepository = AppDataSource.getRepository(Show)
  }

  private isMovieInList (showId: number, user: User) {
    return user.list.find(show => show.id === showId)
  }

  async add (showId: number, user:User) {
    if (this.isMovieInList(showId, user)) {
      throw new BadRequestException(`The show id: ${showId} is already in your list`)
    }

    const show = await this.showRepository.findOne({ where: { id: showId } })

    if (!show) {
      throw new BadRequestException(`Show id: ${showId} not found`)
    }
    user.list = [...user.list, show]

    await this.userRepository.save(user)

    return user.list
  }

  async remove (showId: number, user: User) {
    const newUserList = user.list.filter(show => show.id !== showId)

    return this.userRepository.save({ ...user, list: newUserList })
  }
}

export default ListService
