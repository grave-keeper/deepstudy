fetch('../../components/changePasswordForm/index.html')
    .then(changePasswordForm => changePasswordForm.text())
    .then(changePasswordForm => document.getElementById('change-password').innerHTML = changePasswordForm)
    .catch(error => console.error("Error while fetching changePasswordForm \n", error))
