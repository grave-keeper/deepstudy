import { Router } from 'express'
import { getPyq } from '../controllers/pyq.controller.js'
import { authMiddleware } from '../middleware/jwt.middleware.js'
const router = Router()

router.get('/', authMiddleware, getPyq)

export default router