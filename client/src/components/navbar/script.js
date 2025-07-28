// set the profile info in the navbar-right
if (localStorage.getItem('user')) {
    const user = JSON.parse(localStorage.getItem('user'))
    document.querySelector('.navbar-right > li:first-child').style.display = 'none'
    const div1 = document.querySelector('.navbar-right > div:first-of-type')
    const div2 = document.querySelector('.navbar-right > div:last-of-type')
    div1.style.display = 'none'
    div2.style.display = 'flex'
    div2.querySelector('img:first-child').src = user.picture
    div2.querySelector('p').innerText = user.name
}

// check for user on click input on navbar-right
const dropdownToggle = document.querySelector('.navbar-right > div:last-child')
const dropdownMenu = document.querySelector('.navbar-right > div:last-child > ul:last-child')

dropdownToggle.onclick = (event) => {
    dropdownMenu.style.display =
        getComputedStyle(dropdownMenu).display === 'none' ? 'block' : 'none'
}

document.onclick = (event) => {
    const isClickInside = dropdownToggle.contains(event.target)
    if (!isClickInside && getComputedStyle(dropdownMenu).display === 'block') {
        dropdownMenu.style.display =
            getComputedStyle(dropdownMenu).display === 'none' ? 'block' : 'none'
    }
}