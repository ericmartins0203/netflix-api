import { NextFunction, Request, Response } from "express"
import { CustomError } from "../utils/errorHandler.util"

function handleError (
  err: TypeError | CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  let customError = err

  if (!(err instanceof CustomError)) {
    customError = new CustomError(
      'Oh no, this is embarrasing. We are having troubles my friend'
    )
  }
  res.status((customError as CustomError).status).send(customError)
}

export default handleError
