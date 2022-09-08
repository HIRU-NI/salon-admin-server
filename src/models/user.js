const mongoose = require("mongoose")

const user = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true, 
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    }
})

module.exports= user