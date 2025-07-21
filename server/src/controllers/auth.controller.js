import { checkIfUserExistsByGoogleId } from '../helper/db.helper.js'
import googleAuthService from '../services/googleAuth.service.js'
import { createJwtTokens } from '../helper/jwt.helper.js'
import { FRONTEND_URL } from '../config/constants.js'
import { User } from '../models/user.model.js'
import {
    refreshTokenCookieOptions,
    accessTokenCookieOptions,
} from '../services/cookie.service.js'

const handleGoogleCallback = async (req, res) => {
    console.log('Inside google handleGoogleCallback...')
    const { code } = req.query

    if (!code) {
        return res.redirect(`http://localhost:3000/error?reason=no_code`)
    }

    const authService = new googleAuthService()
    const { tokens, payload } = await authService.handleGoogleAuth(code)
    const userExists = await checkIfUserExistsByGoogleId(payload.sub)
    let jwtTokens = new Object()

    if (!userExists) {
        const user = new User({
            googleId: payload.sub,
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            emailVerified: payload.email_verified,
            tokens: {
                google: {
                    accessToken: tokens.access_token,
                    refreshToken: tokens.refresh_token,
                    expiresAt: tokens.expiry_date,
                },
            },
        })

        // generating jwt tokens
        jwtTokens = createJwtTokens({
            _id: user._id,
            name: user.name,
            email: user.email,
        })

        user.tokens.jwt = {
            accessToken: jwtTokens.jwtAccessToken,
            refreshToken: jwtTokens.jwtRefreshToken,
            expiresAt: jwtTokens.jwtRefreshTokenExpiry,
        }

        await user.save()

        console.log('user created : ', user)
    } else {
        const user = await User.findOne({ googleId: payload.sub })
        user.tokens.google = {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expiresAt: tokens.expiry_date,
        }
        jwtTokens = createJwtTokens({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
        user.tokens.jwt = {
            accessToken: jwtTokens.jwtAccessToken,
            refreshToken: jwtTokens.jwtRefreshToken,
            expiresAt: jwtTokens.jwtRefreshTokenExpiry,
        }
        await user.save()
        console.log('user updated : ', user)
    }

    res.status(200)
        .cookie(
            'refreshToken',
            jwtTokens.refreshToken,
            accessTokenCookieOptions
        )
        .cookie('accessToken', jwtTokens.accessToken, refreshTokenCookieOptions)
        .redirect(`http://localhost:3000/src/pages/home`)
}

export { handleGoogleCallback }
