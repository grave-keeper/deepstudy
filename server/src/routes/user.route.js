import { Router } from 'express'
import {
    registerEmail,
    registerUser,
    loginUser,
    getUserData,
    submitFeedback,
    logOutUser,
} from '../controllers/user.controller.js'
import { authMiddleware } from '../middleware/jwt.middleware.js'

const router = Router()

router.get('/register-email', registerEmail)
router.post('/signup', registerUser)
router.post('/signin', loginUser)
router.get('/profile', authMiddleware, getUserData)
router.post('/feedback', submitFeedback)
router.get('/logout', authMiddleware, logOutUser)

export default router