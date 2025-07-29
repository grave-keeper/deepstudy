import { fetchNavBar, getFooter } from '../../helper/component.js'

fetchNavBar()
;(async () => {
    await fetch('../../components/feedback')
        .then((feedback) => feedback.text())
        .then((feedback) => (document.getElementById('feedback').innerHTML = feedback))
        .catch((error) => console.error('Error while fetching feedback \n', error))

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/feedback/script.js'
    document.body.appendChild(script)
})()

getFooter()
