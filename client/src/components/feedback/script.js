import { sendFeedback } from '../../services/userService.js'

const form = document.querySelector('form')
const submitBtn = form.querySelector('button[type="submit"]')

submitBtn.onclick = async (e) => {
    e.preventDefault()
    if (!form.checkValidity()) return form.reportValidity()
    const formData = new FormData(form)
    const status = sendFeedback(formData)
    if (status) form.reset()
}