import { googleSignUp, githubSignUp } from '../api/auth.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const handleGoogleSignUp = asyncHandler(() => {
    googleSignUp()
})

const handleGitHubSignup = asyncHandler(() => {
    githubSignUp()
})

export { handleGoogleSignUp, handleGitHubSignup }