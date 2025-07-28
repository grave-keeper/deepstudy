import { getUserData } from '../../services/userService.js'
;(async () => {
    await fetch('../../components/navbar')
        .then((navbar) => navbar.text())
        .then((navbar) => (document.getElementById('navbar').innerHTML = navbar))
        .catch((err) => console.error('Error while fetching navbar \n', err))

    await getUserData()

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/navbar/script.js'
    document.body.appendChild(script)
})()

fetch('../../components/content')
    .then((content) => content.text())
    .then((content) => (document.getElementById('content').innerHTML = content))
    .catch((err) => console.error('Error while fetching content \n', err))

fetch('../../components/footer')
    .then((footer) => footer.text())
    .then((footer) => (document.getElementById('footer').innerHTML = footer))
    .catch((err) => console.error('Error while fetching footer \n', err))