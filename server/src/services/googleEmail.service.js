// import { google } from 'googleapis'
// import oAuth2Client from '../config/oAuth2Client.js'

// import createEmail from '../utils/createEmail.js'

// const sendEmail = async ({ email, verificationCode }) => {
//     try {
//         const gmail = google.gmail({ version: 'v1', auth: oAuth2Client })
//         const from = 'Grave Keeper gravesoulkeeper@gmail.com'
//         const subject = 'Your Verification Code'
//         const message = `Hello,\n\nYour verification code is: ${verificationCode}\n\nBest regards,\nYour App`
//         const encodedMessage = createEmail(email, from, subject, message)

//         const response = await gmail.users.messages.send({
//             userId: 'me',
//             requestBody: {
//                 raw: encodedMessage,
//             },
//         })
//         console.log('Email sent successfully:', response.data)
//         return response.data
//     } catch (error) {
//         console.error('Error sending email:', error.message)
//         throw new Error(
//             'Failed to send verification email. Please try again later.'
//         )
//     }
// }

// export default sendEmail
