import { handleGoogleSignUp, handleGitHubSignup } from '../../services/authService.js'
import { handleSignIn } from '../../services/userService.js'

const form = document.querySelector('#sigin-credentials > form')
form.querySelector('button[type="submit"]').onclick = (event) => {
    event.preventDefault()
    const formData = new FormData(form)
    handleSignIn(formData)
}

document.querySelector('.open-auth > div:first-child').onclick = handleGoogleSignUp
document.querySelector('.open-auth > div:last-child').onclick = handleGitHubSignup
