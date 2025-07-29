import { fetchNavBar, getFooter } from '../../helper/component.js'
import { getUserData } from '../../services/userService.js';

fetchNavBar()

;(async () => {
    await fetch('../../components/userProfile')
        .then((userProfile) => userProfile.text())
        .then((userProfile) => (document.getElementById('profile').innerHTML = userProfile))
        .catch((error) => console.error('Error while fetching userProfile \n', error))
    await getUserData()
    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/userProfile/script.js'
    document.body.appendChild(script)
})()

getFooter()