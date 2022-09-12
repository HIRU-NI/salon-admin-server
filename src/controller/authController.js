const User = require("../models/user")
const jwt = require("jsonwebtoken")

//handle errors
const handleErrors = (err) => {
    let errors = {email: "", password: ""}

    // incorrect email
    if (err.message === 'incorrect email') {
        errors.email = 'No user account found with the given email';
    }

    // incorrect password
    if (err.message === 'incorrect password') {
        errors.password = 'Incorrect password';
    }


    //duplicate email error
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

//max age of the auth token
const maxAge = 1 * 24 * 60 * 60

//create auth token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: maxAge
    })
}

module.exports.signup = async (req, res) => {
    const { email, password, firstName, lastName } = req.body

    try {
        const resp = await User.create({
            email,
            firstName,
            lastName,
            password,
        })
        const token = createToken(resp._id)
        res.cookie("jwt", token, {httpOnly: true, maxAge: maxAge*1000})
        res.status(201).json({
            user: resp,
            token: token
        })
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error)
        res.status(400).json(errors)
    }
}

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const resp = await User.login(email, password)
        if(resp) {
            const token = createToken(resp._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000, secure:false, sameSite: 'None' });
            res.status(200).json({
            user: resp,
            token:token
        });
        }
        res.status(500).json({
            error: "Server error"
        })
    } catch (error) {
        res.status(400).json({
            error: "Invalid credentials"
        })
    }
}

module.exports.logout = (req, res) => {
    try {
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).send()
        
    } catch (error) {
        res.status(400).json( error );
    }
}