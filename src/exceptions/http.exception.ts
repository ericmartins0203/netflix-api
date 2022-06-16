import HTTP_STATUS from "../enums/http-status.enums"

abstract class HttpException extends Error {
  message: string

  status: HTTP_STATUS

  constructor (message:string, status: HTTP_STATUS) {
    super(message)

    this.message = message
    this.status = status
  }
}

export default HttpException
