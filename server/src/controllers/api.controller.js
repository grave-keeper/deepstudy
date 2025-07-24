import googleAuthService from '../services/googleAuth.service.js'
import { createGitHubAuthUrl } from '../services/githubAuth.service.js'
import { safeRoutePromise } from '../utils/asyncHandler.js'

const getGoogleAuthUrl = safeRoutePromise((req, res) => {
    console.log('inside the getGoogleAuthUrl')
    const googleAuth = new googleAuthService()
    const authUrl = googleAuth.createGoogleAuthUrl()
    // res.status(200).json({ url: authUrl })  // need to handle the url manually in the frontend
    // once user hit locahost:4000/api/auth/google it will redirect the user to google oauth
    res.status(302).redirect(authUrl)
})

const getGitHubAuthUrl = safeRoutePromise((req, res) => {
    console.log('insde the getGitHubAuthUrl')
    const authUrl = createGitHubAuthUrl()
    console.log('authUrl is : ', authUrl)
    res.status(302).redirect(authUrl)
})

export { getGoogleAuthUrl, getGitHubAuthUrl }