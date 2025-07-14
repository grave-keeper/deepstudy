import mongoose from 'mongoose'
import { MONGODB_URL } from './constants.js'

export const connectMongoDB = async () => {
  try {
    console.log('connecting to the mongodb database...')
    const connectionInstance = await mongoose.connect(MONGODB_URL)
    console.log('MongoDB connected successfully :',connectionInstance.connection.host)
  } catch (error) {
    console.log('MongoDB connection failed!\n', error.message)
    process.exit(1)
  }
}
