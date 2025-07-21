import jwt from 'jsonwebtoken'
import {
    JWT_REFRESH_TOKEN_SECRET,
    JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_EXPIRY,
    JWT_ACCESS_TOKEN_EXPIRY,
} from '../config/constants.js'

const createJwtTokens = ({ _id, email, name }) => {
    const accessTokenPayload = {
        _id: _id,
        name,
        email,
    }
    const refreshTokenPayload = {
        _id: _id,
    }

    const jwtAccessToken = jwt.sign(
        accessTokenPayload,
        JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY / 1000, // 1 day in sec
        }
    )

    const jwtRefreshToken = jwt.sign(
        refreshTokenPayload,
        JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY / 1000, // 7 days in sec
        }
    )

    return {
        jwtAccessToken,
        jwtRefreshToken,
        jwtRefreshTokenExpiry: Date.now() + Number(JWT_REFRESH_TOKEN_EXPIRY), // current time in sec + 7 days in sec
    }
}

export { createJwtTokens }
