import sendEmail from '../services/sendEmail.js'
import verificationCode from '../helper/verificationCode.js'

const registerEmail = async (req, res) => {
    await sendEmail({
        email: req.body.email,
        verificationCode: verificationCode(),
    })
    res.status(200)
}

const resendVerificationCode = async (req, res) => {}
const verifyCode = async (req, res) => {}
const registerUser = async (req, res) => {}
const loginUser = async (req, res) => {}
const getUserData = async (req, res) => {}
const logOutUser = async () => {}
const updateAccountDetails = async () => {}

export {
    registerEmail,
    resendVerificationCode,
    verifyCode,
    registerUser,
    loginUser,
    getUserData,
    logOutUser,
    updateAccountDetails,
}
