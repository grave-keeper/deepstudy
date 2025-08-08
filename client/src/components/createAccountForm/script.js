import { handleSignUp } from '../../services/userService.js'

const eyeStates = document.querySelectorAll('#account-credentials .password .eye')

eyeStates.forEach((eyeState) => {
    eyeState.onclick = () => {
        if (eyeState.src.includes('eye_close')) {
            eyeState.src = '../../../assets/svg/eye_open.svg'
            // passwordState.type = 'text'
            eyeState.parentElement.querySelector('input').type = 'text'
            return
        }
        eyeState.src = '../../../assets/svg/eye_close.svg'
        eyeState.parentElement.querySelector('input').type = 'password'
    }
})

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const form = document.querySelector('#account-credentials > form')
form.querySelector('button[type="submit"]').onclick = (event) => {
    event.preventDefault()
    if (!form.checkValidity()) {
        form.reportValidity()
        return
    }
    const formData = new FormData(form)
    formData.append('id', id)
    handleSignUp(formData, id)
}
