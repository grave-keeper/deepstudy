fetch('../../components/navbar')
    .then(navbar => navbar.text())
    .then(navbar => document.getElementById('navbar').innerHTML = navbar)
    .catch(error => console.error("Error while fetching navbar \n", error))

fetch('../../components/feedback')
    .then(feedback => feedback.text())
    .then(feedback => document.getElementById('feedback').innerHTML = feedback)
    .catch(error => console.error("Error while fetching feedback \n", error))

fetch('../../components/footer')
    .then(footer => footer.text())
    .then(footer => document.getElementById('footer').innerHTML = footer)
    .catch(error => console.error("Error while fetching footer \n", error))

