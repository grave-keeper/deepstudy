import { config } from 'dotenv'
// config({ path: '../../.env' })
config()

const MONGODB_URL =
    process.env.NODE_ENV === 'production'
        ? process.env.MONGODB_URL
        : 'mongodb://localhost:27017'

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
const REFRESH_TOKEN_EXPIRY = process.env.REFRESH_TOKEN_EXPIRY
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
const ACCESS_TOKEN_EXPIRY = process.env.ACCESS_TOKEN_EXPIRY

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN

const FRONTEND_URL = process.env.FRONTEND_URL
const SERVER_PORT = process.env.SERVER_PORT
const SALT_ROUNT = process.env.SALT_ROUNT

export {
    MONGODB_URL,
    REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXPIRY,
    ACCESS_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRY,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    GOOGLE_REFRESH_TOKEN,
    FRONTEND_URL,
    SERVER_PORT,
    SALT_ROUNT,
}
