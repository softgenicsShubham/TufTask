import Joi from 'joi'

export const addBannerValidation = Joi.object({
  Description: Joi.string().min(10).required(),
  ValidTill: Joi.date().required(),
  Link: Joi.string().uri().required(),
  IsVisible: Joi.boolean().required()
})
