require('dotenv').config()
const app = require('./src/app.js')
const gracefulShutdown = require('./utilities/gracefulShutdown')
const connectDB = require('./src/config/dbConfig')
async function StartServer (PORT=process.env.PORT || 3001){
    const server = app.listen(PORT,()=>{
        connectDB()
        console.log('connected in http://localhost:3001 .......')
    })
    gracefulShutdown(server)
    return server
}

StartServer()