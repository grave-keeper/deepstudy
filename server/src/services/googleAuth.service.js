import { google } from 'googleapis'
import {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URL,
    GOOGLE_AUTH_SCOPES,
} from '../config/constants.js'

export default class {
    #oAuth2Client

    constructor() {
        this.#oAuth2Client = new google.auth.OAuth2(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            GOOGLE_REDIRECT_URL
        )
    }

    createGoogleAuthUrl() {
        return this.#oAuth2Client.generateAuthUrl({
            access_type: 'offline', // For refresh token
            scope: GOOGLE_AUTH_SCOPES, // Requested scopes
            prompt: 'consent', // Forces consent screen
            include_granted_scopes: true, // Ensures previously granted scopes are included
        })
    }

    async handleGoogleAuth(code) {
        const { tokens } = await this.#oAuth2Client.getToken(code)
        const payload = await this.#oAuth2Client
            .verifyIdToken({
                idToken: tokens?.id_token,
                audience: GOOGLE_CLIENT_ID,
            })
            .then((response) => {
                return response.getPayload()
            })
            .catch((error) => {
                return new Error("oAth2Client verifyIdToken Error!")
            })
        return { tokens, payload }
    }
}
