fetch('../../components/createAccountForm')
    .then(createAccountForm => createAccountForm.text())
    .then(createAccountForm => document.getElementById('create-account').innerHTML = createAccountForm)
    .catch(error => console.error("Error while fetching createAccountForm \n", error))
