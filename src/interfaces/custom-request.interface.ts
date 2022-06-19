import { Request } from "express"

interface CustomRequest extends Request {
  decoded?: string
}

export default CustomRequest
