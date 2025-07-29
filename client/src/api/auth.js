import { asyncHandler } from '../utils/asyncHandler.js'
import { SERVER_IP } from '../config/constants.js'

const googleSignUp = asyncHandler(() => {
    // 1. approach
    // const response = await fetch(`${SERVER_IP}/api/auth/google`)
    // if (!response.ok) throw new Error('Google signup failed')
    // const { url } = await response.json()
    // window.location.href = url
    // 2. approach
    window.location.href = `${SERVER_IP}/api/auth/google`
    return
})

const githubSignUp = asyncHandler(() => {
    window.location.href = `${SERVER_IP}/api/auth/github`
})

export { googleSignUp, githubSignUp }

/*
    The /api/auth/google endpoint is unique because it responds with a 302 redirect to an external domain (accounts.google.com).
    When the browser follows this redirect, it sends a request to Google’s server, which does not include CORS headers for 
    http://127.0.0.1:3000. Other endpoints likely return direct responses (e.g., JSON) from your backend, which includes the 
    Access-Control-Allow-Origin header, so they don’t trigger CORS errors.
    Google’s OAuth endpoint is designed for browser navigation (e.g., redirects via window.location.href), not for fetch 
    requests from a frontend, which is why the CORS error occurs when the browser tries to follow the redirect.

*/
