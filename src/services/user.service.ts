import bcrypt from "bcrypt"
import { Repository } from "typeorm"

import User from "../entities/user.entity"
import { AppDataSource } from "../../configs/database/data-source"
import { BadRequestException } from "../exceptions"

interface CreateUserDTO {
  email: string;

  password: string;
}

class UserService {
  userRepository: Repository<User>

  constructor () {
    this.userRepository = AppDataSource.getRepository(User)
  }

  private async isEmailInDatabase (email: string) {
    const userFound = await this.userRepository.findOne({ where: { email } })

    return !!userFound
  }

  async getUserByEmail (email: string) : Promise<User | null> {
    const userFound = await this.userRepository.findOne({ where: { email } })

    return userFound
  }

  /**
   * Realiza autenticação do usuário
   *
   * @param createUserDTO Dados do usuário
   * @returns LoginResponse
   *
   */
    async create (createUserDTO: CreateUserDTO) : Promise<User> {
      const { email, password } = createUserDTO
      const isEmailInDatabase = await this.isEmailInDatabase(email)

      if (isEmailInDatabase) {
        throw new BadRequestException("User already exists")
      }

      const SALTS = 10

      const newUserPayload = {
        email,
        password: await bcrypt.hash(password, SALTS)
      }

      return this.userRepository.save(newUserPayload)
    }
}

export default UserService
