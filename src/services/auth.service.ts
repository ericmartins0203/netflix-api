import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { UnauthorizedException } from "../exceptions"
import UserService from "./user.service"

class AuthService {
   /**
   * Realiza autenticação do usuário
   *
   * @param email email do usuário
   * @param password email do usuário
   * @returns LoginResponse
   *
   */
    async login (email: string, password: string) {
      const userService = new UserService()

      const user = await userService.getUserByEmail(email)

      if (!user) {
        throw new UnauthorizedException()
      }

      const passwordMatches = await bcrypt.compare(password, user.password)

      if (!passwordMatches) {
        throw new UnauthorizedException()
      }

      const secret = process.env.SECRET_KEY || 'secret'

      const token = jwt.sign({
        sub: user.email,
        iat: Date.now(),
        email: user.email
      }, secret)

      return {
        token
      }
    }
}

export default AuthService
