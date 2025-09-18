import { Router } from 'express'
import {
    getGoogleAuthUrl,
    getGitHubAuthUrl,
} from '../controllers/api.controller.js'

const router = Router()

router.get('/google', getGoogleAuthUrl)
router.get('/github', getGitHubAuthUrl)

export default router
