import { Octokit } from '@octokit/rest'
import {
    GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET,
    GITHUB_REDIRECT_URL,
} from '../config/constants.js'
import { safeAsyncTry } from '../utils/asyncHandler.js'

const createGitHubAuthUrl = () => {
    return `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${GITHUB_REDIRECT_URL}&scope=user:email`
}

const handleGitHubAuth = safeAsyncTry(async (code) => {
    const tokenResponse = await fetch(
        'https://github.com/login/oauth/access_token',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                client_id: GITHUB_CLIENT_ID,
                client_secret: GITHUB_CLIENT_SECRET,
                code,
            }),
        }
    )

    if (!tokenResponse.ok) {
        throw new Error(`Error : Fetching access token from GitHub`)
    }

    const tokenData = await tokenResponse.text()
    const UrlTokenData = new URLSearchParams(tokenData)
    const accessToken = UrlTokenData.get('access_token')

    const octokit = new Octokit({ auth: accessToken })
    const userData = await octokit.rest.users.getAuthenticated()
    const emailResponse = await octokit.request('GET /user/emails')

    const user = {
        id: userData.data.id,
        name: userData.data.name,
        email: emailResponse.data[0].email,
        picture: userData.data.avatar_url,
        emailVerified: emailResponse.data[0].verified,
        accessToken,
    }

    return user
})

// const revokeGitHubRefreshToken = safeAsyncTry(async (access_token) => {
//     const temp = await fetch(
//         'https://api.github.com/applications/{client_id}/token',
//         {
//             method: 'DELETE',
//             headers: {
//                 Authorization: `Basic ${Buffer.from(
//                     `${GITHUB_CLIENT_ID}:${GITHUB_CLIENT_SECRET}`
//                 ).toString('base64')}`,
//                 'Content-Type': 'application/json',
//                 Accept: 'application/vnd.github+json',
//             },
//             body: JSON.stringify({
//                 access_token,
//             }),
//         }
//     )

//     console.log('data aftere deleting the accesstoken : ', temp)
// })

export { createGitHubAuthUrl, handleGitHubAuth }
