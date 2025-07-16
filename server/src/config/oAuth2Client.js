import { google } from 'googleapis'
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI,
    GOOGLE_REFRESH_TOKEN,
} from './constants.js'

const oAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)
oAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEN })

export default oAuth2Client