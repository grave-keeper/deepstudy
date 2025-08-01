import { handleSignUp } from '../../services/userService.js'

const params = new URLSearchParams(window.location.search)
const id = params.get('id')

const form = document.querySelector('#account-credentials > form')
form.querySelector('button[type="submit"]').onclick = (event) => {
    console.log('inside')
    event.preventDefault()
    const formData = new FormData(form)
    formData.append('id', id)
    handleSignUp(formData, id)
}