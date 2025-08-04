import {
    getUserByGmail,
    getTempUserByGmail,
    getTempUserById,
} from '../helper/db.helper.js'
import { createJwtTokens } from '../services/jwt.service.js'
import { safeRoutePromise } from '../utils/asyncHandler.js'
import { Feedback } from '../models/feedback.model.js'
import { FRONTEND_URL } from '../config/constants.js'
import { TempUser } from '../models/temp.model.js'
import { User } from '../models/user.model.js'
import {
    accessTokenCookieOptions,
    refreshTokenCookieOptions,
} from '../services/cookie.service.js'

const registerEmail = safeRoutePromise(async (req, res) => {
    console.log('inside registerEmail...')
    const email = req.query.email
    if (!email)
        return res
            .status(301)
            .redirect(
                `${FRONTEND_URL}/src/pages/home/index.html?error=no-email`
            )
    const user = await getUserByGmail(email)
    if (user) {
        return res
            .status(301)
            .redirect(
                `${FRONTEND_URL}/src/pages/home/index.html?error=account-already-exists`
            )
    } else {
        let user = await getTempUserByGmail(email)
        if (user) await user.deleteOne()
        user = await TempUser.create({ email })
        res.status(302).redirect(
            `${FRONTEND_URL}/src/pages/create-account/index.html?id=${user._id}`
        )
    }
})

const registerUser = safeRoutePromise(async (req, res) => {
    console.log('inside registerUser ....')
    const { firstName, lastName, password, confirmPassword, id } = req.body
    const tempUser = await getTempUserById(id)
    if (!tempUser) {
        console.log('invalid register id ...')
        return res
            .status(301)
            .redirect(
                `${FRONTEND_URL}/src/pages/home/index.html?error=invalid-register-id`
            )
    }

    const email = tempUser.email
    await tempUser.deleteOne()
    const name = firstName.trim() + ' ' + lastName.trim()
    const user = new User({
        email,
        name,
        password,
    })

    const { accessToken, refreshToken } = createJwtTokens({
        _id: user._id,
        email,
        name,
    })

    user.sessions = { refreshToken }
    await user.save()

    res.status(201)
        .cookie('accessToken', accessToken, accessTokenCookieOptions)
        .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
        .redirect(`${FRONTEND_URL}/src/pages/home/index.html?success=register`)
})

const loginUser = safeRoutePromise(async (req, res) => {
    console.log('inside loginUser...')
    const { email, password } = req.body
    const user = await getUserByGmail(email)
    if (!user) {
        return res.status(400).json({ error: 'invalid credentials' })
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)
    if (!isPasswordCorrect) {
        return res.status(400).json({ error: 'invalid credentials' })
    }

    const { accessToken, refreshToken } = createJwtTokens({
        _id: user._id,
        email: user.email,
        name: user.name,
    })

    user.sessions = { refreshToken }
    await user.save()

    // console.log('sign in user is : ', user)

    res.status(301)
        .cookie('accessToken', accessToken, accessTokenCookieOptions)
        .cookie('refreshToken', refreshToken, refreshTokenCookieOptions)
        .redirect(`${FRONTEND_URL}/src/pages/home/index.html?success=login`)
})

const getUserData = safeRoutePromise(async (req, res) => {
    console.log('inside getUserData...')
    const user = await User.findById(req.user._id).select(
        '-_id email name picture createdAt'
    )
    res.status(200).json({ message: user })
})

const submitFeedback = safeRoutePromise(async (req, res) => {
    const { name, email, type, comment } = req.body
    await Feedback.create({ name, email, type, comment })
    res.status(200).json({ message: 'comment send successfully!' })
})

const logOutUser = async (req, res) => {
    console.log('inside logOutUser...')
    await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $unset: { sessions: 1 } }
    )
    res.status(200)
        .clearCookie('accessToken', accessTokenCookieOptions)
        .clearCookie('refreshToken', refreshTokenCookieOptions)
        .json({ message: 'logout successfully!' })
}

export {
    registerEmail,
    registerUser,
    loginUser,
    getUserData,
    submitFeedback,
    logOutUser,
}
