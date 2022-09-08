const User = require("../models/user")

module.exports.signup = async (req, res) => {
    const { email, password } = req.body

    try {
        const resp = await User.create({
            email:email,
            password: password
        })
        res.status(201).json(resp)
    } catch (error) {
        console.log(error)
        res.status(500).send("Error : user not created")
    }
}

module.exports.login = (req, res) => {
    res.send("   login")
}