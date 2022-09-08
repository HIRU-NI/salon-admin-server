const User = require("../models/user")

//handle errors
const handleErrors = (err) => {
    let errors = {email: "", password: ""}

    //validation error
    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors

}

module.exports.signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const resp = await User.create({
            email:email,
            password: password
        })
        res.status(201).json(resp)
    } catch (error) {
        const errors = handleErrors(error)
        res.status(400).json(errors)
    }
}

module.exports.login = (req, res) => {
    res.send("   login")
}