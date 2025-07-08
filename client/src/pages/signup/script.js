fetch('../../components/signupForm')
    .then(signupForm => signupForm.text())
    .then(signupForm => document.getElementById('signup').innerHTML = signupForm)
    .catch(error => console.error("Error while fetching signupForm \n", error))
