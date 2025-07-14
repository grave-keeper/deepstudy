import { Schema, isValidObjectId, model } from 'mongoose'

const validateCode = function (vc) {
  return /^\d{6}$/.test(vc)
}

const tempSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    index: true,
    trim: true,
  },
  verificationCode: {
    type: String,
    validate: {
      validator: validateCode,
      message: 'verification code must be 6 digits',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600, // Deletes documents after 10 minutes (600 seconds)
  },
})

export const TempEmail = model('tempemails', tempSchema)