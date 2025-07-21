import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { SALT_ROUNT } from '../config/constants.js'

const userSchema = new Schema(
    {
        googleId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
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
            default: null,
        },
        password: {
            type: String,
            default: null,
        },
        emailVerified: {
            type: String,
            default: false,
        },
        tokens: {
            jwt: {
                accessToken: { type: String, default: null },
                refreshToken: { type: String, default: null },
                expiresAt: { type: String, default: null },
            },
            google: {
                accessToken: { type: String, default: null },
                refreshToken: { type: String, default: null },
                expiresAt: { type: String, default: null },
            },
            github: {
                accessToken: { type: String, default: null },
                refreshToken: { type: String, default: null },
                expiresAt: { type: String, default: null },
            },
        },
    },
    { timestamps: true }
)

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next()
    this.password = await bcrypt(this.password, SALT_ROUNT)
    next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = new model('users', userSchema)
