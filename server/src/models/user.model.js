import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { SALT_ROUND } from '../config/constants.js'

const authSchema = new Schema(
    {
        provider: {
            type: String,
            enum: ['google', 'github'],
            required: true,
        },
        providerId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        accessToken: {
            type: String,
            required: true,
        },
        refreshToken: {
            type: String,
            required: function () {
                return this.provider === 'google'
            },
        },
        expiresIn: {
            type: Number,
        },
    },
    { _id: false }
)

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email address is required'],
            lowercase: true,
            unique: true,
            index: true,
            trim: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
        },
        picture: {
            type: String,
            default: 'https://c.tenor.com/dPxPiS67duoAAAAd/tenor.gif',
        },
        password: {
            type: String,
            default: null,
        },
        emailVerified: {
            type: Boolean,
            default: false,
        },
        auth: {
            type: authSchema,
            required: false,
            validate: {
                validator: function (val) {
                    // If `auth` exists, it must have required fields
                    if (!val) return true // no auth? okay
                    return val.provider && val.providerId && val.accessToken
                },
            },
        },

        sessions: {
            refreshToken: { type: String, required: true },
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt.hash(this.password, Number(SALT_ROUND))
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    // check if current passwod exist or not because when sign in with google or github it will won't set any password
    if (!this.password) {
        return false
    }
    return await bcrypt.compare(password, this.password)
}

export const User = new model('user', userSchema)
