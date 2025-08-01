import { handleRegisterEmail } from '../../services/userService.js'

const cta = document.querySelector('#hero-section > .hero-left > .cta > .hero-input')

cta.querySelector('button').onclick = () => {
    const email = cta.querySelector('input[type="email"]').value
    handleRegisterEmail(email)
}
