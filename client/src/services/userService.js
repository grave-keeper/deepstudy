import { signIn, profile, feedback, logOut } from '../api/users.js'

const handleSignIn = async (userData) => {
    const [status, data] = await signIn(userData)
    if (status) {
        localStorage.setItem('user', JSON.stringify(data))
        return true
    } else {
        return false
    }
}

const getUserData = async () => {
    const [status, data] = await profile()
    if (status) {
        localStorage.setItem('user', JSON.stringify(data))
        return data
    } else {
        return false
    }
}

const sendFeedback = async (formData) => {
    const [status, data] = await feedback(formData)
    if (status) {
        return [true, data]
    } else {
        return [false, data]
    }
}

const handleLogOut = async () => {
    const [status, data] = await logOut()
    if (status) {
        localStorage.removeItem('user')
        return [true, data]
    } else {
        return [false, data]
    }
}

export { handleSignIn, getUserData, sendFeedback, handleLogOut }
