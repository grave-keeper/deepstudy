import { User } from '../models/user.model.js'

const getUserByGmail = async (email) => {
    const user = await User.findOne({ email })
    return user
}

const getUserByGoogleId = async (googleId) => {
    const user = await User.findOne({ "auth.providerId" : googleId })
    return user
}

export { getUserByGmail, getUserByGoogleId }