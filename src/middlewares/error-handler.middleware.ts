import { NextFunction, Request } from "express"
import HTTP_STATUS from "../enums/http-status.enums"
import HttpException from "../exceptions/http.exception"
import { CustomResponse } from "../interfaces/custom-response.interface"

export const errorHandler = (req: Request, res: CustomResponse, next: NextFunction) => {
  res.errorHandler = (e: any) => {
    if (e instanceof HttpException) {
      res
      .status(e.status)
      .json({ error: true, message: e.message, details: e })
    } else {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ error: true })
    }
}
  next()
}
