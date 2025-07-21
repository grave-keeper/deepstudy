import googleAuthService from '../services/googleAuth.service.js'

const getGoogleAuthUrl = (req, res) => {
    console.log('inside the getGoogleAuthUrl')
    const googleAuth = new googleAuthService()
    const authUrl = googleAuth.createGoogleAuthUrl()
    // res.status(200).json({ url: authUrl })  // need to handle the url manually in the frontend
    // once user hit locahost:4000/api/auth/google it will redirect the user to google oauth
    res.status(302).redirect(authUrl)
}

export { getGoogleAuthUrl }
