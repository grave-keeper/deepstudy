import { handleGitHubAuth } from '../services/githubAuth.service.js'
import googleAuthService from '../services/googleAuth.service.js'
import { safeRoutePromise } from '../utils/asyncHandler.js'
import { createJwtTokens } from '../services/jwt.service.js'
import { getUserByGmail } from '../helper/db.helper.js'
import { FRONTEND_URL } from '../config/constants.js'
import { User } from '../models/user.model.js'
import {
    refreshTokenCookieOptions,
    accessTokenCookieOptions,
} from '../services/cookie.service.js'

const handleGoogleCallback = safeRoutePromise(async (req, res) => {
    console.log('Inside google handleGoogleCallback...')
    const { code } = req.query

    if (!code) {
        return res
            .status(301)
            .redirect(`${FRONTEND_URL}/src/pages/home/index.html?error=no-google-code`)
    }

    const authService = new googleAuthService()
    const { tokens, payload } = await authService.handleGoogleAuth(code)
    console.log('tokens are : ', tokens)
    let user = await getUserByGmail(payload.email)
    let jwtTokens = new Object()

    if (!user) {
        const user = new User({
            email: payload.email,
            name: payload.name,
            picture: payload.picture,
            emailVerified: payload.email_verified,
            auth: {
                provider: 'google',
                providerId: payload.sub,
                accessToken: tokens.access_token,
                refreshToken: tokens.refresh_token,
                expiresIn: tokens.expiry_date,
            },
        })

        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })

        console.log('jwtTokens is : ', jwtTokens)

        user.sessions = {
            refreshToken: jwtTokens.refreshToken,
        }

        await user.save()

        console.log('user created : ', user)
    } else {
        console.log('inside else : ', user.auth.refreshToken)
        if (user.auth && user.auth.provider === 'google') {
            console.log('revoking google token...')
            authService.revokeGoogleRefreshToken(user.auth.refreshToken)
        }
        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })
        user = await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            {
                $set: {
                    name: payload.name,
                    picture: payload.picture,
                    emailVerified: payload.email_verified,
                    'auth.provider': 'google',
                    'auth.providerId': payload.sub,
                    'auth.accessToken': tokens.access_token,
                    'auth.refreshToken': tokens.refresh_token,
                    'auth.expiresIn': tokens.expiry_date,
                },
            },
            { new: true }
        )

        console.log('user updated')
    }

    res.status(301)
        .cookie('accessToken', jwtTokens.accessToken, refreshTokenCookieOptions)
        .cookie(
            'refreshToken',
            jwtTokens.refreshToken,
            accessTokenCookieOptions
        )
        .redirect(`${FRONTEND_URL}/src/pages/home/index.html?success=google-callback`)
})

const handleGitHubCallback = safeRoutePromise(async (req, res) => {
    console.log('Inside google handleGitHubCallback...')
    const { code } = req.query
    if (!code) {
        return res
            .status(400)
            .redirect(`${FRONTEND_URL}/src/pages/home/index.html?error=no-github-code`)
    }
    const userData = await handleGitHubAuth(code)
    console.log('userdata is : ', userData)
    let user = await getUserByGmail(userData.email)
    let jwtTokens = new Object()

    if (!user) {
        const user = new User({
            email: userData.email,
            name: userData.name,
            picture: userData.picture,
            emailVerified: userData.emailVerified,
            auth: {
                provider: 'github',
                providerId: userData.id,
                accessToken: userData.accessToken,
            },
        })

        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })

        console.log('jwtTokens is : ', jwtTokens)

        user.sessions = {
            refreshToken: jwtTokens.refreshToken,
        }

        await user.save()

        console.log('user created : ', user)
    } else {
        if (user.auth && user.auth.provider === 'google') {
            console.log('revoked google token...')
            const authService = new googleAuthService()
            authService.revokeGoogleRefreshToken(user.auth.refreshToken)
        }
        console.log('inside else : ')
        jwtTokens = createJwtTokens({
            _id: user._id,
            email: user.email,
            name: user.name,
        })
        user = await User.findByIdAndUpdate(
            {
                _id: user._id,
            },
            {
                $set: {
                    name: userData.name,
                    picture: userData.picture,
                    emailVerified: userData.emailVerified,
                    'auth.provider': 'github',
                    'auth.providerId': userData.id,
                    'auth.accessToken': userData.accessToken,
                },
            },
            { new: true }
        )

        console.log('update user is : ', user)
    }

    res.status(301)
        .cookie('accessToken', jwtTokens.accessToken, refreshTokenCookieOptions)
        .cookie(
            'refreshToken',
            jwtTokens.refreshToken,
            accessTokenCookieOptions
        )
        .redirect(`${FRONTEND_URL}/src/pages/home/index.html?success=github-callback`)
})

export { handleGoogleCallback, handleGitHubCallback }
