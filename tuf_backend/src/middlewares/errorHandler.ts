import { type Request, type Response, type NextFunction } from 'express'
import logger from '../utils/logger'
import { type CustomError } from '../utils/types/CustomError'

export default function errorHandler (err: CustomError, req: Request, res: Response, next: NextFunction): Response<any, Record<string, any>> {
  const isProduction = process.env.nodeEnvironment === 'production'

  logger.error('**********************************************')
  logger.error('Error MIDDLEWARE Triggered')
  console.log('ERROR: ', err)
  logger.error('**********************************************')

  if (err.name === 'badRequest') {
    return res.status(400).send({
      success: false,
      message: err.message
    }).end()
  }
  if (err.name === 'unAuthorized') {
    return res.status(401).send({
      success: false,
      message: err.message
    }).end()
  }
  if (err.name === 'permission') {
    return res.status(403).send({
      success: false,
      message: err.message
    }).end()
  }
  if (err.name === 'duplication') {
    return res.status(409).send({
      success: false,
      message: err.message
    }).end()
  }
  if (err.name === 'notFound') {
    return res.status(404).send({
      success: false,
      message: err.message
    }).end()
  }
  if (err.name === 'delete') {
    return res.status(409).send({
      success: false,
      message: isProduction ? 'There was some error. Please try again later' : err.message
    }).end()
  }
  if (err.isOperational ?? false) {
    return res.status(400).send({
      success: false,
      message: err.statusCode
    }).end()
  }

  return res.status(500).send({
    success: false,
    message: 'Unexpected internal server error!'
  }).end()
}
