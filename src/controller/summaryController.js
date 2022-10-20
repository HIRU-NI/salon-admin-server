const moment = require("moment/moment");
const reservationModel = require("../models/reservation");
const stylistModel = require("../models/stylist");

//get number of reservations for each stylist during current week
module.exports.getCurrentWeekAllocations = async (req, res, next) => {
  try {
    const stylists = await stylistModel.find();

    const reservations = await reservationModel.find();

    var startOfWeek = moment().startOf("week").add(1, "days");
    var endOfWeek = moment().endOf("week").add(1, "days");

    var daysOfWeek = [];
    var day = startOfWeek;

    while (day <= endOfWeek) {
      daysOfWeek.push(day.toDate());
      day = day.clone().add(1, "d");
    }

    const calcReservationsCount = (day, stylistId) => {
      return reservations.filter(
        (reservation) =>
          moment(reservation.date).isSame(day, "date") &&
          stylistId.toString() === reservation.stylist.toString()
      ).length;
    };

    let summary = [];

    stylists.map((stylist) => {
      summary.push({
        stylist: stylist.name,
        sunday: calcReservationsCount(daysOfWeek[0], stylist._id),
        monday: calcReservationsCount(daysOfWeek[1], stylist._id),
        tuesday: calcReservationsCount(daysOfWeek[2], stylist._id),
        wednesday: calcReservationsCount(daysOfWeek[3], stylist._id),
        thursday: calcReservationsCount(daysOfWeek[4], stylist._id),
        friday: calcReservationsCount(daysOfWeek[5], stylist._id),
        saturday: calcReservationsCount(daysOfWeek[6], stylist._id),
      });
    });

    res.status(200).json(summary);
  } catch (error) {
    next(error);
  }
};
