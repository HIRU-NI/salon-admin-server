const nodemailer = require("nodemailer");

const FROM_EMAIL = "hirunimanth@gmail.com"

 //email trasport config
 const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
    from: FROM_EMAIL,
    to: toEmail,
    subject: `Hello ${clientName}`,
    text: `Your reservation has been successfully made. Please refer the following details\nDate: ${reservationDate}\nTime: ${reservationTime}\nStylist: ${stylistName}\nService: ${service}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`reservation confirmation sent to ${toEmail}`);
  });
};

module.exports.sendRegistrationLink = (toEmail, name, link) => {
  //email options
  const mailOptions = {
    from: FROM_EMAIL,
    to: toEmail,
    subject: `Hello ${name}`,
    html: `<p>You have been invited to register as a Salon Prauge admin</p><p>Click <a href="${link}">here</a> to reset your password</p>`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) console.log(error);
    else console.log(`registration link sent to ${toEmail}`);
  });
}
