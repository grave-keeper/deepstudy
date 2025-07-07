fetch('../../component/navbar')
    .then(navbar => navbar.text())
    .then(navbar => document.getElementById('navbar').innerHTML = navbar)
    .catch(error => console.error("Error while fetching navbar \n", error))

fetch('../../component/filter')
    .then(filter => filter.text())
    .then(filter => document.getElementById('filter').innerHTML = filter)
    .catch(error => console.error("Error while fetching filter \n", error))

fetch('../../component/footer')
    .then(footer => footer.text())
    .then(footer => document.getElementById('footer').innerHTML = footer)
    .catch(error => console.error("Error while fetching footer \n", error))
