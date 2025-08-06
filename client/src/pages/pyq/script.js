import { fetchNavBar, getFooter } from '../../helper/component.js'

fetchNavBar()
;(async () => {
    await fetch('../../components/filter/index.html')
        .then((filter) => filter.text())
        .then((filter) => (document.getElementById('filter').innerHTML = filter))
        .catch((error) => console.error('Error while fetching filter \n', error))

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/filter/script.js'
    document.body.appendChild(script)
})()

getFooter()
