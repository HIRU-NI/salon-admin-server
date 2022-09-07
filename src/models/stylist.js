const mongoose = require("mongoose")

const stylist = mongoose.model("stylist", new mongoose.Schema({
    firstName : {
        type: String,
        required: true
    },
    lastName : {
        type: String,
        required: true
    },
    
}))

module.exports = stylist