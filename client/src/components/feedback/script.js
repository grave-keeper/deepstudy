import { sendFeedback } from '../../services/userService.js'

const form = document.querySelector('form')
const submitBtn = form.querySelector('button[type="submit"]')

submitBtn.onclick = (e) => {
    e.preventDefault()
    const formData = new FormData(form)
    sendFeedback(formData)
}