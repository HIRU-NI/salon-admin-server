const mongoose = require("mongoose")

const connect = async () => {
    try {
        const conn = await mongoose.connect(
            "mongodb+srv://user:pwd@cluster0.dyiywon.mongodb.net/?retryWrites=true&w=majority"
            )
            console.log(`connection established : ${conn.connection.host}`)
    } catch (error) {
        console.log(`Mongodb error: ${error}`)
    }
}

module.exports = connect
