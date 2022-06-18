import { NextFunction, Request } from "express"
import { Schema } from "joi"

import { CustomResponse } from "../interfaces/custom-response.interface"

const validationMiddleware = (schema: Schema) => async (req: Request, res: CustomResponse, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    return next()
  } catch (e: any) {
    // res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: e.message })
    res.errorHandler && res.errorHandler(e)
  }
}

export default validationMiddleware
