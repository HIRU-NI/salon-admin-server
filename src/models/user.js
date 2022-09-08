const mongoose = require("mongoose")

//validators
const { isEmail } = require("validator")

const user = mongoose.model("user", {
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "An user with the given email already exists"], 
        lowercase: true, 
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password should contain alteast 6 characters"]
    }
})

module.exports= user