import { DataTypes, type Model } from 'sequelize'
import { sq } from '../config/db'
import { type BannerCreationAttributes, type BannerAttributes } from './types/Banner'

const Banner = sq.define<Model<BannerAttributes, BannerCreationAttributes>>(
  'Banner',
  {
    BannerID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    ValidTill: {
      type: DataTypes.DATE,
      allowNull: false
    },
    Link: {
      type: DataTypes.STRING,
      allowNull: false
    },
    IsVisible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },
  {
    timestamps: true,
    freezeTableName: true,
    tableName: 'Banner'
  }
)
export {
  Banner
}
