import { handleGoogleSignUp, handleGitHubSignup } from '../../services/authService.js'

document.querySelector('.open-auth > div:first-child').onclick = handleGoogleSignUp
document.querySelector('.open-auth > div:last-child').onclick = handleGitHubSignup