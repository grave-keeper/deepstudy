import { handleRegisterEmail } from '../../services/userService.js'

const cta = document.querySelector('#hero-section > .hero-left > .cta > .hero-input')

cta.querySelector('button').onclick = () => {
    const email = cta.querySelector('input[type="email"]').value
    handleRegisterEmail(email)
}

const ctaLoggedIn = document.querySelector('#hero-section > .hero-left > .cta > .cta-logged-in')
if (localStorage.getItem('user')) {
    cta.parentElement.querySelector('p:first-child').style.display = 'none'
    cta.style.display = 'none'
    ctaLoggedIn.style.display = 'flex'
}

ctaLoggedIn.querySelector('button').onclick = () => {
    window.location.href = "../../pages/pyq/index.html"
}