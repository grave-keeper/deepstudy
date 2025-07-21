function generateVerificationCode() {
    const options = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let str = ''
    for (let i = 0; i < 6; i++) {
        str += options.charAt(Math.floor(Math.random() * 62))
    }
    return str
}

export default generateVerificationCode