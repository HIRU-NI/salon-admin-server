const mongoose = require("mongoose")

const reservation = mongoose.model("reservation", new mongoose.Schema({
    client : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Client'
    },
    stylist : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Stylist'
    },
    service : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    date: {
        type: Date,
        required: true
    }
    
}))

module.exports = reservation