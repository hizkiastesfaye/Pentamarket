const mongoose = require('mongoose')

const GracefulShutdown =(server) =>{
    const shutdown = async ()=>{
        mongoose.connection.close()
        server.close(()=>{
            console.log('closeing the remaining server')
            process.exit(0)
        })
        process.exit(0)
    }
    process.on('SIGINT',shutdown)
    process.on('SIGTERM',shutdown)
}

module.exports = GracefulShutdown