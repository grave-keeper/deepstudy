import cookieParser from 'cookie-parser'
import express from 'express'
import cors from 'cors'

import { FRONTEND_URL } from './config/constants.js'

export const app = express()

const corsOptions = {
    origin: FRONTEND_URL,
    methods: ['GET', 'POST', 'PATCH'],
    credentials: true,
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true })) // use qs
app.use(cookieParser())

import userRouter from './routes/user.route.js'
app.use('/users', userRouter)
// redirect auth url
import apiRouter from './routes/api.route.js'
app.use('/api/auth', apiRouter)
// Redirct url : google,github
import authRouter from './routes/auth.route.js'
app.use('/auth', authRouter)
// books route : pyq
import pyqRouter from './routes/pyq.route.js'
app.use('/pyq', pyqRouter)


// Error-handling middleware
app.use((error, req, res, next) => {
    console.log('erros middleware : \n', error)
    res.status(500).json({
        message: 'Internal Server Error',
    })
})