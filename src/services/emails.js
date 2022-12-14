const nodemailer = require("nodemailer");

//send email
module.exports.sendEmail = (
  toEmail,
  clientName,
  reservationDate,
  reservationTime,
  stylistName,
  service
) => {
  //email options
  const mailOptions = {
    from: "hirunimanth@gmail.com",
    to: toEmail,
    subject: `Hello ${clientName}`,
    text: `Your reservation has been successfully made. Please refer the following details\nDate: ${reservationDate}\nTime: ${reservationTime}\nStylist: ${stylistName}\nService: ${service}`,
  };

  //email trasport config
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hirunimanth@gmail.com",
      pass: "vjttbzijabiqxvpr",
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`reservation confirmation sent to ${toEmail}`);
  });
};

module.exports.sendRegistrationLink = (toEmail, name, link) => {
  //email options
  const mailOptions = {
    from: "hirunimanth@gmail.com",
    to: toEmail,
    subject: `Hello ${name}`,
    html: `<p>You have been invited to register as a Salon Prauge admin</p><p>Click <a href="${link}">here</a> to reset your password</p>`
  };

  //email trasport config
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "hirunimanth@gmail.com",
      pass: "vjttbzijabiqxvpr",
    },
  });

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`registration link sent to ${toEmail}`);
  });
}
