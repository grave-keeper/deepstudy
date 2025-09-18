import { SERVER_IP } from '../config/constants.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const registerEmail = asyncHandler(async (email) => {
    window.location.href = `${SERVER_IP}/users/register-email?email=${email}`
})

const singUp = asyncHandler(async (userData) => {
    const urlEncodedData = new URLSearchParams(userData).toString()
    const response = await fetch(`${SERVER_IP}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
        credentials: 'include',
    })
    if (response.redirected) {
        window.location.href = response.url
    }
    const data = await response.json()
    return [false, data.message]
})

const signIn = asyncHandler(async (userCredentials) => {
    const urlEncodedData = new URLSearchParams(userCredentials).toString()
    const response = await fetch(`${SERVER_IP}/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
        credentials: 'include',
    })
    if (response.redirected) {
        window.location.href = response.url
    }
    const data = await response.json()
    return [false, data.message]
})

const profile = asyncHandler(async () => {
    const response = await fetch(`${SERVER_IP}/users/profile`, {
        credentials: 'include',
    })

    const data = await response.json()
    return response.ok ? [true, data.message] : [false, data.error]
})

const feedback = asyncHandler(async (formData) => {
    const urlEncodedData = new URLSearchParams(formData).toString()
    const response = await fetch(`${SERVER_IP}/users/feedback`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: urlEncodedData,
    })

    const data = await response.json()
    return response.ok ? [true, data.message] : [false, data.message]
})

const logOut = asyncHandler(async () => {
    const response = await fetch(`${SERVER_IP}/users/logout`, {
        credentials: 'include',
    })

    const data = await response.json()
    return response.ok ? [true, data.message] : [false, data.message]
})

export { registerEmail, singUp, signIn, profile, feedback, logOut }
