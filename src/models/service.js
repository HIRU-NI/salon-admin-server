const mongoose = require("mongoose")

const service = mongoose.model("service", new mongoose.Schema({
    title : {
        type: String,
        required: true
    },
    desc : {
        type: String,
        required: true
    },
    amount : {
        type: Number,
        required: true
    },
}))

module.exports = service