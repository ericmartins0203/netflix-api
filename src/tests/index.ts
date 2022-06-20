import { faker } from "@faker-js/faker"

interface IUserInterface {
  email: string,
  password: string
}

const generateUser = (): IUserInterface => {
  const email = faker.internet.email().toLowerCase()
  const password = faker.random.alpha(5)

  return {
    email,
    password
  }
}

// class ConnectionTestJest {
//     dbPath: string

//     constructor () {
//       this.dbPath = path.join(__dirname, "../../dbTest.sqlLite")
//     }

//     create = async () => {
//       if (existsSync(this.dbPath)) {
//         await unlink(this.dbPath)
//       }

//       await createConnection(dbOptions)
//     }

//     close = async () => {
//       await getConnection(dbOptions.name).close()

//       if (existsSync(this.dbPath)) {
//         await unlink(this.dbPath)
//       }
//     }

//     clear = async () => {
//       const connection = getConnection(dbOptions.name)
//       const entities = connection.entityMetadatas

//       entities.forEach(async (entity) => {
//         const repository = connection.getRepository(entity.name)
//         await repository.query(`DELETE FROM ${entity.tableName}`)
//       })
//     }
//   }

export { generateUser }
