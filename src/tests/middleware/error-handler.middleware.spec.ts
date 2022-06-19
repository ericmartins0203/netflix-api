import { jest } from '@jest/globals'
import { NextFunction, Request, Response } from "express"
import { CustomRequest, CustomResponse } from "../../interfaces"
import { errorHandler } from "../../middlewares/error-handler.middleware"

describe('Error handler middleware', () => {
  const mockReq: Partial<Request> = {}
  const mockRes: Partial<Response> = {}
  const mockNext: Partial<NextFunction> = jest.fn()

  it('should call next', () => {
    errorHandler(
        mockReq as CustomRequest,
        mockRes as CustomResponse,
        mockNext as NextFunction
      )

    expect(mockNext).toBeCalled()
  })

//   it('should call next', () => {
//     errorHandler(
//         mockReq as CustomRequest,
//         mockRes as CustomResponse,
//         mockNext as NextFunction
//       )

//     expect(mockNext).toThrow()
//   })
})
