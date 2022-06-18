import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 100, unique: true })
  email: string

  @Column({ length: 100 })
  password: string
}

export default User
