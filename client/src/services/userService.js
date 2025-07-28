import { asyncHandler } from '../utils/asyncHandler.js'
import { signIn, profile } from '../api/users.js'

const handleSignIn = asyncHandler(async (userData) => {
    const [status, data] = await signIn(userData)
    if (status) {
        localStorage.setItem('user', JSON.stringify(data))
        return true
    } else {
        return false
    }
})

const getUserData = asyncHandler(async () => {
    const [status, data] = await profile()
    if (status) {
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } else {
        return false
    }
})

export { handleSignIn, getUserData }
