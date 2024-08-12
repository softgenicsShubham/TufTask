import express, { type Request, type Response, type NextFunction } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import { testDbConnection } from './config/db'
import log from './utils/logger'
import { headers } from './middlewares/headers'
import router from './routes'
import logger from 'morgan'

const app = express()
testDbConnection().catch(error => {
  console.error('Error connecting to database:', error)
  process.exit(1)
})

app.use(headers)
app.use(logger('tiny'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/', router)

const staticPath = path.resolve(__dirname, 'src', 'uploads')
app.use(express.static(staticPath))
app.get('/favicon.ico', (req, res) => res.status(204).end())

/** **************** ERROR HANDLING */
/** **************** ERROR HANDLING */

app.use((req: Request, res: Response, next: NextFunction) => {
  log.error('*************** API NOT FOUND ***************')
  const error: any = new Error('Page Not Found Error')
  error.status = 404
  next(error)
})

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (error.status === 404) {
    res.status(404).send('<h1>404 Not Found</h1><p>The requested page could not be found.</p>')
  }
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode: number = typeof err.status === 'number' ? err.status : 500
  res.status(statusCode).json({
    error: {
      message: typeof err.message === 'string' ? err.message : 'Internal Server Error'
    }
  })
})

export default app
