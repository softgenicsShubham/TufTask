import { type Request as ExpressRequest, type Response, type NextFunction } from 'express'

declare module 'express-serve-static-core' {
  interface Request {
    clientIP?: any
    browserAgent?: any
  }
}

interface RequestWithClientInfo extends ExpressRequest {
  clientIP?: string
  browserAgent?: string
}

function getClientIPAddress (req: ExpressRequest): string {
  const clientIP = req.headers['x-forwarded-for'] ?? req.socket.remoteAddress
  let ipv4Address: string

  if (Array.isArray(clientIP)) {
    ipv4Address = clientIP[0]?.split(':').pop() ?? ''
  } else {
    ipv4Address = clientIP?.split(':').pop() ?? ''
  }

  return ipv4Address
}

function logRequestInfo (req: RequestWithClientInfo, res: Response, next: NextFunction): void {
  const clientIP = getClientIPAddress(req)
  const browserAgent = req.headers['user-agent'] ?? 'Unknown'

  // Store clientIP and browserAgent in the request object
  req.clientIP = clientIP
  req.browserAgent = browserAgent

  next() // Call next() to pass control to the next middleware in the chain
}

export {
  logRequestInfo
}
