import { handleGetPyqPdfs } from '../../services/pyqService.js'

const dropdownFilter = document.querySelectorAll(
    '#pyq-container > #filter-container > .filter-item'
)
dropdownFilter.forEach((elm) => {
    elm.onclick = (event) => {
        event.stopPropagation()
        if (event.target.closest('span')) {
            return
        }
        // console.log(event)
        const ulFilter = elm.querySelector('ul')
        ulFilter.style.display = getComputedStyle(ulFilter).display === 'none' ? 'block' : 'none'

        ulFilter.querySelectorAll('li').forEach((lsFilter) => {
            lsFilter.onclick = (event) => {
                elm.querySelector('p').innerText = event.target.innerText
            }
        })
    }
})

document.addEventListener('click', () => {
    document
        .querySelectorAll('#pyq-container > #filter-container > .filter-item > ul')
        .forEach((elm) => {
            // if ((elm.style.display = 'block')) {
            //     elm.style.display = 'none'
            // }
            elm.style.display = 'none'
        })
})

const filterBtn = document.querySelector('#pyq-container > #filter-container > li > button')

filterBtn.onclick = () => {
    const board = document.querySelector(
        '#pyq-container > #filter-container > .filter-item:nth-child(1) > p'
    ).innerText
    const grade = document.querySelector(
        '#pyq-container > #filter-container > .filter-item:nth-child(2) > p'
    ).innerText
    const stream = document.querySelector(
        '#pyq-container > #filter-container > .filter-item:nth-child(3) > p'
    ).innerText
    const year = document.querySelector(
        '#pyq-container > #filter-container > .filter-item:nth-child(4) > p'
    ).innerText

    // console.log('board : ', board)
    // console.log('grade : ', grade)
    // console.log('stream : ', stream)
    // console.log('year : ', year)

    displayPyq({ board, grade, stream, year })
}

const qstSection = document.querySelector('#qst-section')
const div = document.createElement('div')
div.innerText =
    'Please select your Class, Board, Stream, and Year — then click ‘Filter’ to view results.'
div.style.textAlign = 'center'
div.style.fontWeight = '600'
qstSection.appendChild(div)

async function displayPyq(filterData) {
    div.innerText = 'Please wait fetching data...'
    const [status, data] = await handleGetPyqPdfs(filterData)
    if (status) {
        // console.log('inside if ...')
        // console.log(Object.entries(data)[0])
        qstSection.removeChild(div) // gonna give error
        Object.keys(data).forEach((item) => {
            // Append Header
            const pyqHeader = document.createElement('h2')
            pyqHeader.innerText = item
            qstSection.appendChild(pyqHeader)

            // console.log('inside the : ', item)
            // console.log(data[item])

            const qstContainer = document.createElement('section')
            data[item].forEach((pdfs) => {
                // Add all the pyq pdfs in dom
                const article = document.createElement('article')
                const div = document.createElement('div')
                const p = document.createElement('p')
                const a = document.createElement('a')
                const button = document.createElement('button')

                // adding values
                // console.log(pdfs.name)
                qstContainer.id = 'qst-container'
                p.innerText = pdfs.name.split('-').slice(3, -1).join(' ')
                a.innerText = pdfs.name.split('-').join(' ')
                // a.href = pdfs.url
                // a.target = '_blank'
                button.innerText = 'Download'

                article.appendChild(div)
                div.appendChild(p)
                div.appendChild(a)
                article.appendChild(button)

                qstContainer.appendChild(article)
                qstSection.appendChild(qstContainer)

                // view
                div.onclick = () => {
                    window.open(pdfs.url, '_blank')
                }

                // downloadable
                button.onclick = async () => {
                    try {
                        const response = await fetch(pdfs.url)
                        const data = await response.blob()
                        const url = URL.createObjectURL(data)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = pdfs.name
                        document.body.appendChild(a)
                        a.click()
                        document.body.removeChild(a)
                        URL.revokeObjectURL(url) // clean up
                    } catch (error) {
                        console.log('Error while fetching downloadable pdf')
                    }
                }
            })
        })
    } else {
        div.innerText = 'This paper isn’t available in the archive yet. :('
    }
    // console.log('pyq is displaying... ')
}
