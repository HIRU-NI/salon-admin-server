const mongoose = require("mongoose")

const reservation = mongoose.model("reservation", new mongoose.Schema({
    client : {
        type: String,
        required: true
    },
    stylist : {
        type: String,
        required: true
    },
    service : {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
    
}))

module.exports = reservation