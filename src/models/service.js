const mongoose = require("mongoose")

const service = mongoose.model("service", new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
}))

module.exports = service