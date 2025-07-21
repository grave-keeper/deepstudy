import { User } from '../models/user.model.js'

const checkIfUserExistsByEmail = async (email) => {
    const user = await User.findOne({ email })
    return !!user
}

const checkIfUserExistsByGoogleId = async (googleId) => {
    const user = await User.findOne({ googleId })
    return !!user
}

export { checkIfUserExistsByEmail, checkIfUserExistsByGoogleId }