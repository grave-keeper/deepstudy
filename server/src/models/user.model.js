import { Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

import { SALT_ROUNT } from '../config/constants.js'

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
        auth: {
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
                required: true, // Required for both Google and GitHub
                unique: true,
            },
            refreshToken: {
                type: String,
                required: function () {
                    return this.provider === 'google' // Required only for Google
                },
                unique: function () {
                    return this.provider === 'google' // Unique only for Google
                },
            },
            expiresIn: { type: Number },
        },

        sessions: {
            refreshToken: { type: String, required: true, unique: true },
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

export const User = new model('user', userSchema)