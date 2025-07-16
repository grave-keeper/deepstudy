import { Router } from 'express'
import { handleOAuthCallback } from '../controllers/auth.controller.js'

const router = Router()

router.get('/oauth2callback', handleOAuthCallback)

export default router
