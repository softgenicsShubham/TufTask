import { Router } from 'express'
import * as bannerApi from '../controllers/Banner'

const router = Router()

/* eslint-disable @typescript-eslint/no-misused-promises */

/** *****************************************PATCH REQUEST******************************** */

router.put('/modifyBannerDetails/:BannerID', bannerApi.modifyBannerDetails)

/* -----------------------------------------------------------------------------------  */

/** *****************************************GET REQUEST******************************** */

router.get('/getBannerDetails/:BannerID', bannerApi.getBannerDetails)

/* -----------------------------------------------------------------------------------  */

/** *****************************************POST REQUEST******************************** */

router.post('/createNewBanner', bannerApi.createNewBanner)

/* -----------------------------------------------------------------------------------  */

/* eslint-enable @typescript-eslint/no-misused-promises */

export default router
