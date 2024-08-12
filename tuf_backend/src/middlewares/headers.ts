import { type Request, type Response, type NextFunction } from 'express'

export const headers = (req: Request, res: Response, next: NextFunction): Response => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE')
    return res.status(200).json({})
  }
  next()
  return res
}
