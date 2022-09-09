const User = require("../models/user")
const jwt = require("jsonwebtoken")

//handle errors
const handleErrors = (err) => {
    let errors = {email: "", password: ""}

    //duplicate error code 
    if (err.code === 11000) {
        errors.email = "An user with the given email already exists"
        return errors
    }

    //validation error
    if(err.message.includes("user validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors

}

const maxAge = 1 * 1 * 60 * 60

const createToken = (id) => {
    return jwt.sign({ id }, "salon prauge secret", {
        expiresIn: maxAge
    })
}

module.exports.signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const resp = await User.create({
            email:email,
            password: password
        })
        const token = createToken(resp._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error)
        res.status(400).json(errors)
    }
}

module.exports.login = (req, res) => {
    res.send("   login")
}