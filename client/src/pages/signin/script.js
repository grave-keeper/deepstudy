fetch('../../components/signinForm')
    .then(signinForm => signinForm.text())
    .then(signinForm => document.getElementById('sigin').innerHTML = signinForm)
    .catch(error => console.error("Error while fetching sigin \n", error))
