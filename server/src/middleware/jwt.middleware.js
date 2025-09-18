import jwt from 'jsonwebtoken'
import { JWT_ACCESS_TOKEN_SECRET } from '../config/constants.js'

export const authMiddleware = (req, res, next) => {
    // console.log('inside the middleware...')
    const token = req.cookies

    if (!token) return res.status(401).json({ error: 'Unauthorized user' })

    try {
        const decode = jwt.verify(token.accessToken, JWT_ACCESS_TOKEN_SECRET)
        req.user = decode
        next()
    } catch (error) {
        // console.log('Error in authorized ')
        return res
            .status(401)
            .clearCookie('accessToken')
            .json({ error: 'Unauthorized user' })
    }
}
