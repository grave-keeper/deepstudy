import { handleGoogleSignUp, handleGitHubSignup } from '../../services/authService.js'

console.log(document.querySelector('.open-auth > :first-child'))
document.querySelector('.open-auth > div:first-child').onclick = handleGoogleSignUp
document.querySelector('.open-auth > div:last-child').onclick = handleGitHubSignup
