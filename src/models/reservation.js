const mongoose = require("mongoose")

const reservation = mongoose.model("reservation", new mongoose.Schema({
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
    
}))

module.exports = reservation