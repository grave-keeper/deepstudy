import { Router } from 'express'
import {
    handleGoogleCallback,
    handleGitHubCallback,
} from '../controllers/auth.controller.js'

const router = Router()

router.get('/google/callback', handleGoogleCallback)
router.get('/github/callback', handleGitHubCallback)

export default router