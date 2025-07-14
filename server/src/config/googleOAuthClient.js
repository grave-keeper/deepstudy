import { google } from 'googleapis'
import {
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  REDIRECT_URI,
  REFRESH_TOKEN_SECRET,
} from './constants.js'

export const oAuth2Client = new google.auth.OAuth2(
  AUTH_CLIENT_ID,
  AUTH_CLIENT_SECRET,
  REDIRECT_URI
)
