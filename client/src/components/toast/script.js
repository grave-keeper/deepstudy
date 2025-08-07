export default async function toast(data) {
    await fetch('../../components/toast/index.html')
        .then((toast) => toast.text())
        .then((tost) => {
            const toast = document.createElement('div')
            toast.innerHTML = tost
            toast.id = 'toast'
            document.body.appendChild(toast)
        })
        .catch((err) => {
            console.error('Error while fetching content\n', err)
        })
    const toast = document.querySelector('#toast #toast-container')
    // console.log(toast)
    if (data.status) {
        toast.querySelector('#sign-tick').style.display = 'inline'
        toast.querySelector('#sign-cross').style.display = 'none'
        toast.style.borderLeft = '4px solid green'
    } else {
        toast.querySelector('#sign-tick').style.display = 'none'
        toast.querySelector('#sign-cross').style.display = 'inline'
        toast.style.borderLeft = '4px solid red'
    }

    toast.querySelector('div').innerText = data.message
    toast.style.display = 'flex'
    setTimeout(() => {
        document.body.removeChild(document.querySelector('#toast'))
    }, 5000)
}
