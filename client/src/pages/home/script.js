fetch('../../components/navbar')
    .then(navbar => navbar.text())
    .then(navbar => document.getElementById('navbar').innerHTML = navbar)
    .catch(error => console.error("Error while fetching navbar \n", error))

fetch('../../components/content')
    .then(content => content.text())
    .then(content => document.getElementById('content').innerHTML = content)
    .catch(error => console.error("Error while fetching content \n", error))

fetch('../../components/footer')
    .then(footer => footer.text())
    .then(footer => document.getElementById('footer').innerHTML = footer)
    .catch(error => console.error("Error while fetching footer \n", error))

