import { handleGoogleSignUp, handleGitHubSignup } from '../../services/authService.js'
import { handleSignIn } from '../../services/userService.js'

const eyeState = document.querySelector('#sigin-credentials .password .eye')
const passwordState = document.querySelector('#sigin-credentials .password input')

eyeState.onclick = () => {
    if (eyeState.src.includes('eye_close')) {
        eyeState.src = '../../../assets/svg/eye_open.svg'
        passwordState.type = 'text'
        return
    }
    eyeState.src = '../../../assets/svg/eye_close.svg'
    passwordState.type = 'password'
}

const form = document.querySelector('#sigin-credentials > form')
form.querySelector('button[type="submit"]').onclick = (event) => {
    event.preventDefault()
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }
    const formData = new FormData(form)
    handleSignIn(formData)
}

document.querySelector('.open-auth > div:first-child').onclick = handleGoogleSignUp
document.querySelector('.open-auth > div:last-child').onclick = handleGitHubSignup
