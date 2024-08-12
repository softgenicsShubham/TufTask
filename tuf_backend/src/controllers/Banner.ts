import { type Request, type Response, type NextFunction } from 'express'
import logger from '../utils/logger'
import errorHandling from '../utils/errorObject'
import { type CustomError } from '../utils/types/CustomError'
import { Banner } from '../models/Banner'
import { addBannerValidation } from '../validation/addBannerValidation'

const createNewBanner = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
  logger.info('INFO -> BANNER CREATION API CALLED')
  try {
    // Validate the request body
    const { error } = addBannerValidation.validate(req.body)
    console.log("IP", req.clientIP)
    console.log("Browser", req.browserAgent)
    // If validation fails, throw a bad request error
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Extract Description, ValidTill, Link and IsVisible from the request body
    const Description: string = req.body.Description ?? ''
    const ValidTill: Date = req.body.ValidTill ?? new Date()
    const Link: string = req.body.Link ?? ''
    const IsVisible: boolean = req.body.IsVisible ?? true

    // Create a new banner record
    const BannerDetail = await Banner.create({
      Description,
      ValidTill,
      Link,
      IsVisible
    })

    return res.status(201).json({
      success: true,
      payload: BannerDetail
    })
  } catch (error) {
    const customError = error as CustomError
    logger.error(customError.message)
    return res.status(500).json({ message: customError.message })
  }
}

const modifyBannerDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
  logger.info('INFO -> BANNER MODIFICATION API CALLED')
  try {
    const { BannerID } = req.params
    console.log("IP", req.clientIP)
    console.log("Browser", req.browserAgent)
    // Validate the request body
    const { error } = addBannerValidation.validate(req.body)

    // If validation fails, throw a bad request error
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message
      });
    }

    // Extract the updated fields from the request body
    const updatedFields = {
      Description: req.body.Description,
      ValidTill: req.body.ValidTill,
      Link: req.body.Link,
      IsVisible: req.body.IsVisible
    }

    // Update the banner details
    const [updated] = await Banner.update(updatedFields, {
      where: { BannerID }
    })

    if (updated !== null) {
      const updatedBanner = await Banner.findByPk(BannerID)
      return res.status(200).json({
        success: true,
        payload: updatedBanner
      })
    }

    throw errorHandling('Banner not found', 'notFound')
  } catch (error) {
    const customError = error as CustomError
    logger.error(customError)
    console.log(customError)
    return res.status(500).json({ message: customError.message })
  }
}

const getBannerDetails = async (req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>> => {
  logger.info('INFO -> GET BANNER DETAILS API CALLED')
  try {
    const { BannerID } = req.params

    console.log("IP", req.clientIP)
    console.log("Browser", req.browserAgent)

    // Check if BannerID is a valid number
    if (isNaN(Number(BannerID))) {
      return res.status(400).json({
        success: false,
        message: 'Invalid BannerID'
      });
    }

    // Find the banner by ID
    const banner = await Banner.findOne({
      where: {
        IsVisible: true
      }
    })

    // Explicitly check for null
    if (banner !== null) {
      return res.status(200).json({
        success: true,
        payload: banner
      })
    }

    // Throw an error if the banner is not found
    throw errorHandling('Banner not found', 'notFound')
  } catch (error) {
    const customError = error as CustomError
    logger.error(customError.message)
    return res.status(500).json({ message: customError.message })
  }
}

export {
  createNewBanner,
  modifyBannerDetails,
  getBannerDetails
}
