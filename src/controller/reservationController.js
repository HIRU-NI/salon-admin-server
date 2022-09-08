const reservationModel = require("../models/reservation")

module.exports.get = async (req, res) => {
    const {id} = req.params

    const resp = await reservationModel.findById(id)

    res.send({
        success: true,
        data: resp
    })


}
module.exports.getAll = async (req, res) => {
    const resp = await reservationModel.find()

    res.send({
        success: true,
        data: resp
    })
}
module.exports.create = async (req, res) => {
    const {client, stylist, service, date} = req.body

    const resp = await reservationModel.create({
        client,
        stylist,
        service,
        date
    })

    res.send({
        success: true,
        data: resp
    })

} 
module.exports.update = async (req, res) => {
    const {id} = req.params
    const {client, stylist, service, date} = req.body


    const resp = await reservationModel.findById(id)

    if (resp) {
        resp.client = client
        resp.stylist = stylist
        resp. service = service
        resp. date = date
    }

    await resp.save()

    res.send({
        success: true,
        data: resp
    })
}
module.exports.delete = async (req, res) => {

    const {id} = req.params

    const resp = await reservationModel.deleteOne({id})

    res.send({
        success: true,
        data: resp
    })
}