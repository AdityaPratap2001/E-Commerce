const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const config = require("../config/config");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key: config.SEND_GRID_KEY,
    },
  })
);

exports.sendLinkEmail = (email, token) => {
  console.log(email,token);
  transporter
    .sendMail({
      to: email,
      from: "pratapsinghaditya2001@gmail.com",
      subject: "Email verification!",
      html: `<p>Link: <a href='http://localhost:3000/verify/${token}'>Click here</a></p>`,
    })
    .catch((err) => {
      console.log(err);
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};