;(async () => {
    await fetch('../../components/createAccountForm/index.html')
        .then((createAccountForm) => createAccountForm.text())
        .then(
            (createAccountForm) =>
                (document.getElementById('create-account').innerHTML = createAccountForm)
        )
        .catch((error) => console.error('Error while fetching createAccountForm \n', error))
    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/createAccountForm/script.js'
    document.body.appendChild(script)
})()
