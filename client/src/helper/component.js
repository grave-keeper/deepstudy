import { getUserData } from '../services/userService.js'

async function fetchNavBar() {
    await fetch('../../components/navbar/index.html')
        .then((navbar) => navbar.text())
        .then((navbar) => (document.getElementById('navbar').innerHTML = navbar))
        .catch((err) => console.error('Error while fetching navbar \n', err))

    // fetch userInfo it localstorage doesn't have 'user'
    if (!localStorage.getItem('user')) {
        await getUserData()
    }

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/navbar/script.js'
    document.body.appendChild(script)
}

async function getFooter() {
    await fetch('../../components/footer/index.html')
        .then((footer) => footer.text())
        .then((footer) => (document.getElementById('footer').innerHTML = footer))
        .catch((err) => console.error('Error while fetching footer \n', err))
}

export { fetchNavBar, getFooter }
