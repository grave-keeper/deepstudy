import { User } from '../models/user.model.js'
import { TempUser } from '../models/temp.model.js'

const getUserByGmail = async (email) => {
    let user = null
    if (email && email != 'null') {
        user = await User.findOne({ email })
    }
    return user
}

const getUserByGoogleId = async (googleId) => {
    let user
    if (googleId) {
        user = await User.findOne({ 'auth.providerId': googleId })
    }
    return user
}

const getTempUserByGmail = async (email) => {
    let user
    if (email) {
        user = await TempUser.findOne({ email })
    }
    return user
}

const getTempUserById = async (id) => {
    let user = null
    if (id && id != 'null') {
        user = await TempUser.findById(id)
    }
    return user
}

export {
    getUserByGmail,
    getUserByGoogleId,
    getTempUserByGmail,
    getTempUserById,
}
