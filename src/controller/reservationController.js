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
    try {
        const resp = await reservationModel.find()

        res.status(200).json(resp)
    } catch (error) {
        res.status(400).json({
            error: "Server error: Could not fetch reservations"
        })
    }
}
module.exports.create = async (req, res) => {
   try {
    const {client, stylist, service, date} = req.body

    const resp = await reservationModel.create({
        client,
        stylist,
        service,
        date
    })

    res.status(200).json(resp)
   } catch (error) {
    res.status(400).json({
        error: "Server error: could not create the reservation"
    })
   }

} 

module.exports.update = async (req, res) => {
    try { 
        const {id} = req.params
        const {client, stylist, service, date, isComplete} = req.body

        const resp = await reservationModel.findById(id)

        if (resp) {
            resp.client = client
            resp.stylist = stylist
            resp.service = service
            resp.date = date
            resp.isComplete = isComplete
        }

        await resp.save()

        res.status(200).json(resp) 
    } catch (error) {
        
        res.status(400).json({
            error: "Server error: could not update reservation"
        })
    }
}

module.exports.delete = async (req, res) => {
    try {
        const {id} = req.params
        const resp = await reservationModel.findByIdAndDelete(id)

        res.status(200).json(resp)
    } catch (error) {
        res.status(400).json({
            error: "Server error: Could not delete the reservation"
        })
    }
}