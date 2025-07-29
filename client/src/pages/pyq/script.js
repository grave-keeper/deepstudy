import { fetchNavBar, getFooter } from '../../helper/component.js'

fetchNavBar()

fetch('../../components/filter')
    .then((filter) => filter.text())
    .then((filter) => (document.getElementById('filter').innerHTML = filter))
    .catch((error) => console.error('Error while fetching filter \n', error))

getFooter()
