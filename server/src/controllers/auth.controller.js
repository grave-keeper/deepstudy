import { getUserByGoogleId } from '../helper/db.helper.js'
import googleAuthService from '../services/googleAuth.service.js'
import { createJwtTokens } from '../services/jwt.service.js'
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
    let user = await getUserByGoogleId(payload.sub)
    let jwtTokens = new Object()

    if (!user) {
        const user = new User({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            emailVerified: payload.email_verified,
            auth: [
                {
                    provider: 'google',
                    providerId: payload.sub,
                    refreshToken: tokens.refresh_token,
                    expiresIn: tokens.expiry_date,
                },
            ],
        })

        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })

        console.log('jwtTokens is : ', jwtTokens)

        user.sessions = [
            {
                refreshToken: jwtTokens.refreshToken,
                userAgent: req.get('User-Agent'),
            },
        ]

        await user.save()

        console.log('user created : ', user)
    } else {
        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })
        user = await User.findOneAndUpdate(
            {
                auth: {
                    $elemMatch: {
                        provider: 'google',
                        providerId: payload.sub,
                    },
                },
            },
            {
                $set: {
                    name: payload.name,
                    picture: payload.picture,
                    emailVerified: payload.email_verified,
                    'auth.$.refreshToken': tokens.refresh_token,
                    'auth.$.expiresIn': tokens.expiry_date,
                },
                $push: {
                    sessions: {
                        refreshToken: jwtTokens.refreshToken,
                        userAgent: req.get('User-Agent'),
                    },
                },
            },
            { new: true }
        )

        console.log('update user is : ', user)
    }

    res.status(200)
        .cookie('accessToken', jwtTokens.accessToken, refreshTokenCookieOptions)
        .cookie(
            'refreshToken',
            jwtTokens.refreshToken,
            accessTokenCookieOptions
        )
        .redirect(`http://localhost:3000/src/pages/home`)
}

export { handleGoogleCallback }
