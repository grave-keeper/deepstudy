fetch('../../components/navbar')
    .then(navbar => navbar.text())
    .then(navbar => document.getElementById('navbar').innerHTML = navbar)
    .catch(error => console.error("Error while fetching navbar \n", error))

fetch('../../components/userProfile')
    .then(userProfile => userProfile.text())
    .then(userProfile => document.getElementById('profile').innerHTML = userProfile)
    .catch(error => console.error("Error while fetching userProfile \n", error))

fetch('../../components/footer')
    .then(footer => footer.text())
    .then(footer => document.getElementById('footer').innerHTML = footer)
    .catch(error => console.error("Error while fetching footer \n", error))
