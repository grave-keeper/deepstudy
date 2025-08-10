import { registerEmail, singUp, signIn, profile, feedback, logOut } from '../api/users.js'
import toast from '../components/toast/script.js'

const handleRegisterEmail = async (email) => {
    registerEmail(email)
}

const handleSignUp = async (userData) => {
    const [status, data] = await singUp(userData)
    if (!status) {
        toast({ status: false, message: data })
    }
}

const handleSignIn = async (userCredentials) => {
    const [status, data] = await signIn(userCredentials)
    if (!status) {
        toast({ status: false, message: data })
    }
}

const getUserData = async () => {
    const [status, data] = await profile()
    if (status) {
        localStorage.setItem('user', JSON.stringify(data))
        return data
    }
}

const sendFeedback = async (formData) => {
    const [status, data] = await feedback(formData)
    if (status) {
        toast({ status: true, message: data })
        return true
    }
    toast({ status: false, message: data })
    return false
}

const handleLogOut = async () => {
    const [status, data] = await logOut()
    if (status) {
        localStorage.removeItem('user')
        window.location.href = `${window.location.href}?success=log-out`
    }
    toast({ status: false, message: data })
    localStorage.removeItem('user')
}

export { handleRegisterEmail, handleSignUp, handleSignIn, getUserData, sendFeedback, handleLogOut }
