const stylistModel = require("../models/stylist")

module.exports.getAll = async (req, res) => {
    try {
        const resp = await stylistModel.find()
        res.status(200).json(resp)
    } catch (error) {
        console.log(error)
        const errors = handleErrors(error)
        res.status(400).json(errors)
    }
}