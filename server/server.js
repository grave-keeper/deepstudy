import { app } from './src/app.js'
import { connectMongoDB } from './src/config/db.js'
import { FRONTEND_URL, SERVER_PORT } from './src/config/constants.js'
;(async () => {
    try {
        await connectMongoDB()

        app.listen(SERVER_PORT, () => {
            // console.log(`Server listening on : ${FRONTEND_URL}`)
        })
    } catch (error) {
        console.error(`Failed to start server: \n${error.message}`)
        process.exit(1)
    }
})()
