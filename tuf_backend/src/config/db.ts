import { Sequelize } from 'sequelize'
import { config } from 'dotenv'

config()

interface ProcessEnv {
  DB_NAME: string
  DB_USER: string
  DB_PASS: string
  DB_HOST: string
}

declare const process: {
  env: ProcessEnv
}

const { DB_NAME, DB_USER, DB_PASS, DB_HOST } = process.env

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  dialect: 'mysql',
  logging: false
})

const testDbConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: false, alter: false })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error(error)
  }
}

export { sequelize as sq, testDbConnection }
