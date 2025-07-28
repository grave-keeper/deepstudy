import { googleSignUp, githubSignUp } from '../api/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const handleGoogleSignUp = asyncHandler(() => {
    console.log('fetching google auth url...')
    googleSignUp()
})

const handleGitHubSignup = asyncHandler(() => {
    console.log('fetching github auth url...')
    githubSignUp()
})

export { handleGoogleSignUp, handleGitHubSignup }
