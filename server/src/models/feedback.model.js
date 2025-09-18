import { Schema, model } from 'mongoose'

const feedbackSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        name: {
            type: String,
            trim: true,
            required: true,
        },
        type: {
            type: String,
            // enum: ['inquiry', 'suggestion', 'complain', 'others'],
            default: 'inquiry',
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
)

export const Feedback = model('feedback', feedbackSchema)
