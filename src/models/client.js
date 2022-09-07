const mongoose = require("mongoose")

const client = mongoose.model("client", new mongoose.Schema({
    email : {
        type: String,
        required: true
    },
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    phone: {
        type:String,
        required: true
    }
}))

module.exports = client