import { registerEmail, singUp, signIn, profile, feedback, logOut } from '../api/users.js'

const handleRegisterEmail = async (email) => {
    registerEmail(email)
}

const handleSignUp = async (userData) => {
    await singUp(userData)
}

const handleSignIn = async (userCredentials) => {
    signIn(userCredentials)
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
        window.location.href = `${window.location.href}?success=log-out`
    } else {
        localStorage.removeItem('user')
        location.reload()
        return [false, data]
    }
}

export { handleRegisterEmail, handleSignUp, handleSignIn, getUserData, sendFeedback, handleLogOut }
