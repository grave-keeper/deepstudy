import { fetchNavBar, getFooter } from '../../helper/component.js'

fetchNavBar()
;(async () => {
    await fetch('../../components/content/index.html')
        .then((content) => content.text())
        .then((content) => (document.getElementById('content').innerHTML = content))
        .catch((err) => console.error('Error while fetching content \n', err))

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/content/script.js'
    document.body.appendChild(script)
})()

getFooter()