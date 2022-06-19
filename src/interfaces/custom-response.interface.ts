import { Response } from "express"

interface CustomResponse extends Response {
  errorHandler?: Function
}

export default CustomResponse
