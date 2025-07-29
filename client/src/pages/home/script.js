import { fetchNavBar, getFooter } from '../../helper/component.js'

fetchNavBar()

fetch('../../components/content')
    .then((content) => content.text())
    .then((content) => (document.getElementById('content').innerHTML = content))
    .catch((err) => console.error('Error while fetching content \n', err))

getFooter()
