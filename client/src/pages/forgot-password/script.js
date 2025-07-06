fetch('../../component/forgotPasswordForm')
    .then(forgotPasswordForm => forgotPasswordForm.text())
    .then(forgotPasswordForm => document.getElementById('forgot-password').innerHTML = forgotPasswordForm)
    .catch(error => console.error("Error while fetching forgotPasswordForm \n", error))
