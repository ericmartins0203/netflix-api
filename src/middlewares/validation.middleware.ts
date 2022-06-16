import { NextFunction, Request, Response } from "express"
import { Schema } from "joi"

import HTTP_STATUS from "../enums/http-status.enums"

const validationMiddleware = (schema: Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validateAsync(req.body, {
      abortEarly: false,
      stripUnknown: true
    })

    return next()
  } catch (e: any) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({ error: true, message: e.message })
  }
}

export default validationMiddleware
