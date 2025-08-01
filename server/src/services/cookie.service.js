import {
    JWT_ACCESS_TOKEN_EXPIRY,
    JWT_REFRESH_TOKEN_EXPIRY,
    NODE_ENV,
} from '../config/constants.js'

const accessTokenCookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV === 'production' ? true : false,
    path: '/',
    maxAge: JWT_ACCESS_TOKEN_EXPIRY,
}

const refreshTokenCookieOptions = {
    httpOnly: true,
    sameSite: 'strict',
    secure: NODE_ENV === 'production' ? true : false,
    path: '/',
    maxAge: JWT_REFRESH_TOKEN_EXPIRY,
}

export { accessTokenCookieOptions, refreshTokenCookieOptions }
