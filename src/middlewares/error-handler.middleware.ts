import { NextFunction, Request } from "express"
import HTTP_STATUS from "../enums/http-status.enums"
import HttpException from "../exceptions/http.exception"
import { CustomResponse } from "../interfaces"

export const errorHandler = (request: Request, response: CustomResponse, next: NextFunction) => {
  response.errorHandler = (e: any) => {
    if (e instanceof HttpException) {
      response
        .status(e.status)
        .send({ error: true, message: e.message, details: e })
    } else {
      response.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: true })
    }
  }

  next()
}
