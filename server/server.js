import { app } from './src/app.js'
import { connectMongoDB } from './src/config/db.js'
import { SERVER_PORT } from './src/config/constants.js'
;(async () => {
  try {
    await connectMongoDB()

    app.listen(SERVER_PORT, () => {
      console.log(`Server listening on : http://localhost:${SERVER_PORT}`)
    })
  } catch (error) {
    console.error(`Failed to start server: \n${error.message}`)
    process.exit(1)
  }
})()