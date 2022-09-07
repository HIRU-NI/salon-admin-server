const clientModel = require("../models/client")

module.exports.get = async (req, res) => {
    const {id} = req.params

    const resp = await clientModel.findById(id)

    res.send({
        success: true,
        data: resp
    })


}
module.exports.getAll = async (req, res) => {
    const resp = await clientModel.find()

    res.send({
        success: true,
        data: resp
    })
}
module.exports.create = async (req, res) => {
    const {email, firstName, lastName, phone} = req.body

    const resp = await clientModel.create({
        email,
        firstName,
        lastName,
        phone
    })

    res.send({
        success: true,
        data: resp
    })

} 
module.exports.update = async (req, res) => {
    const {id} = req.params
    const {email, firstName, lastName, phone} = req.body

    const resp = await clientModel.findById(id)

    if (resp) {
        resp.email = email
        resp.firstName = firstName
        resp. lastName = lastName
        resp. phone = phone
    }

    await resp.save()

    res.send({
        success: true,
        data: resp
    })
}
module.exports.delete = async (req, res) => {

    const {id} = req.params

    const resp = await clientModel.deleteOne({id})

    res.send({
        success: true,
        data: resp
    })
}