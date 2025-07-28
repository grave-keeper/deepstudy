console.log('inside profile..')

if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'))
    document.querySelector('.profile-info .name').innerText = user.name
    document.querySelector('.profile-info .email').innerText = user.email
    const date = new Date(user.createdAt)
    const formatted = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
    document.querySelector('.profile-info .joined').innerText = formatted
}
