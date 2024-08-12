import { Router } from 'express'

import { logRequestInfo } from '../middlewares/IpDeviceInfo'
import bannerRouter from './banner'

const router = Router()

router.use('/banner', logRequestInfo, bannerRouter)

export default router
