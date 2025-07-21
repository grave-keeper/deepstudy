import { Router } from 'express'
import { handleGoogleCallback } from '../controllers/auth.controller.js'

const router = Router()

router.get('/google/callback', handleGoogleCallback)

export default router