const mongoose = require("mongoose")

//validators
const { isEmail } = require("validator")

const client = mongoose.model("client", new mongoose.Schema({
    email : {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "A client with the given email already exists"],
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email']
    },
    firstName : {
        type: String,
        required: [true, "First name is required"],
    },
    lastName : {
        type: String,
        required: [true, "Last name is required"],
    },
    phone: {
        type:String,
        required: [true, "Phone number is required"],
    }
}))

module.exports = client