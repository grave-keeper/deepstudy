import { Router } from 'express'
import {
  registerEmail,
  resendVerificationCode,
  verifyCode,
  registerUser,
  loginUser,
  getUserData,
  logOutUser,
  updateAccountDetails,
} from '../controllers/user.controller.js'

const router = Router()

router.post('/register-email', registerEmail)
router.post('/resend-verification-code', resendVerificationCode)
router.post('/verify-code', verifyCode)
router.post('/signup', registerUser)
router.post('/login', loginUser)
router.get('/profile', getUserData)
router.post('/logout', logOutUser)
router.patch('/update-account', updateAccountDetails)

export default router