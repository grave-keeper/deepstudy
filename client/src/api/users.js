import { SERVER_IP } from '../config/constants.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const signIn = asyncHandler(async (userData) => {
    console.log('server ip is : ', SERVER_IP)
    const response = await fetch(`${SERVER_IP}/users/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    const data = await response.json()
    return response.ok ? [true, data] : [false, []]
})

const profile = asyncHandler(async () => {
    const response = await fetch(`${SERVER_IP}/users/profile`, {
        credentials: 'include',
    })

    const data = await response.json()
    return response.ok ? [true, data] : [false, []]
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
    return response.ok ? [true, data.message] : [false, data.error]
})

const logOut = asyncHandler(async () => {
    const response = await fetch(`${SERVER_IP}/users/logout`)

    const data = await response.json()
    return response.ok ? [true, data.message] : [false, data.error]
})

export { signIn, profile, feedback, logOut }
