const mongoose = require("mongoose")

const connect = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB)
        console.log(`connection established : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Mongodb error: ${error}`)
    }
}

module.exports = connect
