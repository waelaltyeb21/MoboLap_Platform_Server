const nodemailer = require("nodemailer");

// Transport
const Transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// Send Mail
const SendMail = async (to, subject, TextToSend) => {
  // Mail Options
  const mailOptions = {
    from: process.env.EMAIL,
    to: to,
    subject: subject,
    html: TextToSend,
  };

  // Send Mail
  const response = Transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      // console.log("Error: ", error);
      return null;
    } else {
      // console.log("Response: ", info.response);
      return info.response ? true : false;
    }
  });
  return response;
};

module.exports = { SendMail };
