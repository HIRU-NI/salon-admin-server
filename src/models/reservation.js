const mongoose = require("mongoose")

const Client = require("./client")
const Stylist = require("./stylist")
const Service = require("./service")

const reservation = mongoose.model("reservation", new mongoose.Schema({
    client : {
        type: Client,
        required: true
    },
    stylist : {
        type: Stylist,
        required: true
    },
    service : {
        type: Service,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
    
}))

module.exports = reservation