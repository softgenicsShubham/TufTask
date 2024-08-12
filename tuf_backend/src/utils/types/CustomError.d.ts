export interface CustomError extends Error {
  name: string
  message: string
  statusCode?: number
  isOperational?: boolean
}
