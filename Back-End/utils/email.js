const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.sendLinkEmail = (email, token) => {
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