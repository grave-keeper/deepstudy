import { Router } from 'express'
import { getGoogleAuthUrl } from '../controllers/api.controller.js'

const router = Router()

router.get('/google', getGoogleAuthUrl)

export default router