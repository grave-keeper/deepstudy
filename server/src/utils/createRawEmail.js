function createRawEmail(to, from, subject, message) {
    const emailLines = [
        `From: ${from}`,
        `To: ${to}`,
        'Content-Type: text/plain; charset="UTF-8"',
        'MIME-Version: 1.0',
        `Subject: ${subject}`,
        '',
        message,
    ]

    const email = emailLines.join('\r\n').trim()
    // Encode the email to base64 and replace characters to make it URL-safe
    const base64EncodedEmail = Buffer.from(email)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')

    return base64EncodedEmail
}

export default createRawEmail
