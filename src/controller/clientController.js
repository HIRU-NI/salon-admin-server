const clientModel = require("../models/client")

//handle errors
const handleErrors = (err) => {
    let errors = {email: "", password: ""}

    //duplicate email error
    if (err.code === 11000) {
        errors.email = "An client with the given email already exists"
        return errors
    }

    //validation error
    if(err.message.includes("client validation failed")) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        })
    }

    return errors

}

module.exports.get = async (req, res) => {
    const {id} = req.params

    const resp = await clientModel.findById(id)

    res.send({
        success: true,
        data: resp
    })


}
module.exports.getAll = async (req, res) => {
    try {
        const resp = await clientModel.find()
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error)
        res.status(400).json(errors)
    }
}
module.exports.create = async (req, res) => {
    try {
        const {email, firstName, lastName, phone} = req.body

    const resp = await clientModel.create({
        email,
        firstName,
        lastName,
        phone
    })

    res.send(resp)
    } catch (error) {
        res.status(500).json({
            error: 'Server error'
        })
    }

} 
module.exports.update = async (req, res) => {
    try {
        const {id} = req.params
        const {email, firstName, lastName, phone} = req.body

        const resp = await clientModel.findById(id)

        if (resp) {
            resp.email = email
            resp.firstName = firstName
            resp. lastName = lastName
            resp. phone = phone
        }
        console.log(resp4)

        await resp.save()

        res.status(200).json(resp)

    } catch (error) {
        res.status(400).json({
            error: "Server error: could not update client data"
        })
    }
}
module.exports.delete = async (req, res) => {

    const {id} = req.params

    const resp = await clientModel.findByIdAndDelete(id)

    res.send({
        success: true,
        data: resp
    })
}