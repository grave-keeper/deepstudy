import { handleGoogleSignUp, handleGitHubSignup } from '../../services/authService.js'
import { handleRegisterEmail } from '../../services/userService.js'

document.querySelector('.open-auth > div:first-child').onclick = handleGoogleSignUp
document.querySelector('.open-auth > div:last-child').onclick = handleGitHubSignup

const email = document.querySelector('#signup-container input[type="email"]')
document.querySelector('#signup-container > form').addEventListener('submit', (event) => {
    event.preventDefault()
    if (!email.checkValidity()) {
        email.reportValidity()
        return
    }

    handleRegisterEmail(email.value)
})
