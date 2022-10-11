const reservationModel = require("../models/reservation");
const clientModel = require("../models/client");
const stylistModel = require("../models/stylist");
const serviceModel = require("../models/service");

const moment = require("moment");

const emails = require("../services/emails");

// get reservation by id
module.exports.get = async (req, res) => {
  const { id } = req.params;

  const resp = await reservationModel.findById(id);

  res.send({
    success: true,
    data: resp,
  });
};

//list all reservations
module.exports.getAll = async (req, res) => {
  try {
    const resp = await reservationModel.find();

    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      error: "Server error: Could not fetch reservations",
    });
  }
};

//create a new reservation
module.exports.create = async (req, res) => {
  try {
    const { client, stylist, service, date } = req.body;

    const resp = await reservationModel.create({
      client,
      stylist,
      service,
      date,
    });

    const clientData = await clientModel.findById(client);
    const stylistData = await stylistModel.findById(stylist);
    const serviceData = await serviceModel.findById(service);

    try {
      emails.sendReservationConfirmationEmail(
        clientData.email,
        clientData.firstName,
        moment(date).format("DD/MM/YYYY"),
        moment(date).format("h:mm A"),
        stylistData.name,
        serviceData.name
      );
    } catch (error) {
      res.status(400).json({
        error: "Could not send the confirmation email to the client",
      });
    }

    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      error: "Server error: could not create the reservation",
    });
  }
};

//update a reservation
module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { client, stylist, service, date, isComplete } = req.body;

    const resp = await reservationModel.findById(id);

    if (resp) {
      resp.client = client;
      resp.stylist = stylist;
      resp.service = service;
      resp.date = date;
      resp.isComplete = isComplete;
    }

    await resp.save();

    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      error: "Server error: could not update reservation",
    });
  }
};

//delete a reservation by id
module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await reservationModel.findByIdAndDelete(id);

    res.status(200).json(resp);
  } catch (error) {
    res.status(400).json({
      error: "Server error: Could not delete the reservation",
    });
  }
};

//send reservation status percentage
module.exports.getCount = async (req, res) => {
  try {
    const resp1 = await reservationModel.find({ isComplete: true });
    const resp2 = await reservationModel.find({ isComplete: false });

    res.status(200).json({
      completed: resp1.length,
      scheduled: resp2.length,
    });
  } catch (error) {
    res.status(400).json({
      error: "Server error: unable to fetch data",
    });
  }
};
