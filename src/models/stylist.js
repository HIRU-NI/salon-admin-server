const mongoose = require("mongoose")

const stylist = mongoose.model("stylist", new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    
}))

module.exports = stylist