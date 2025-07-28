import { SERVER_IP } from '../config/constants.js'

const signIn = async (userData) => {
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
}

const profile = async () => {
    const response = await fetch(`${SERVER_IP}/users/profile`, {
        credentials: 'include',
    })

    const data = await response.json()
    return response.ok ? [true, data] : [false, []]
}

export { signIn, profile }
