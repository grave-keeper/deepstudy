import  oAuth2Client  from "../config/oAuth2Client.js"

export const handleOAuthCallback = async (req, res) => {
    const code = req.query.code
    const { tokens } = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(tokens)
    console.log('Inside the auth.controller.js ')
    console.log('code  : ', req.query.code)
    console.log('token : ', tokens)
    res.status(200)
}
