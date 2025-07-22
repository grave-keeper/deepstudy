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

    const accessToken = jwt.sign(
        accessTokenPayload,
        JWT_ACCESS_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY / 1000, // 1 day in sec
        }
    )

    const refreshToken = jwt.sign(
        refreshTokenPayload,
        JWT_REFRESH_TOKEN_SECRET,
        {
            expiresIn: JWT_ACCESS_TOKEN_EXPIRY / 1000, // 7 days in sec
        }
    )

    return {
        accessToken,
        refreshToken,
    }
}

export { createJwtTokens }
