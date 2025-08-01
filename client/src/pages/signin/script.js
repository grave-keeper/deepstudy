;(async () => {
    await fetch('../../components/signinForm/index.html')
        .then((signinForm) => signinForm.text())
        .then((signinForm) => (document.getElementById('sigin').innerHTML = signinForm))
        .catch((error) => console.error('Error while fetching sigin \n', error))

    const script = document.createElement('script')
    script.type = 'module'
    script.src = '../../components/signinForm/script.js'
    document.body.appendChild(script)
})()
