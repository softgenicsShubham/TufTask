import { type Optional } from 'sequelize'

export interface BannerAttributes {
  BannerID: number
  Description: string
  ValidTill: Date
  Link: string
  IsVisible: boolean
}

export type BannerCreationAttributes = Optional<BannerAttributes, 'BannerID'>
