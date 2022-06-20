import { NextFunction, Request } from "express"
import { Schema } from "joi"

import { ValidationException } from "../exceptions"
import { CustomResponse } from "../interfaces"

const validationMiddleware = (schema: Schema) => async (req: Request, res: CustomResponse, next: NextFunction) => {
  try {
    console.log('entrou')
    const validated = schema.validate(req.body, {
      abortEarly: false
    })

    if (validated.error) {
      throw new ValidationException("Campos inválidos", validated.error?.details.map(item => item.message))
    }

    next()
  } catch (e: any) {
    res.errorHandler && res.errorHandler(e)
  }
}

export default validationMiddleware
