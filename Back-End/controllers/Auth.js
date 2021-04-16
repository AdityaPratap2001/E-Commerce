const User = require("../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const config = require("../config/config");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);

exports.postUserSignup = (req, res, next) => {
  console.log(req.body.username);
  const email = req.body.username;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 402;
    res.status(402).json({
      msg: "Email already exists!",
    });
    console.log(errors[0]);
    throw error;
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        //id exists
        const error = new Error("Email already exisits!");
        res.status(402).json({
          msg: "Email already exists!",
        });
        throw error;
      }
    })
    .then(() => {
      const newUser = new User({
        email: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userType: req.body.roles,
      });
      return newUser.save();
    })
    .then(() => {
      res.status(200).json({
        msg: "User registered!",
      });

      const token = jwt.sign({ email: email }, "KhattiTatti", {
        algorithm: "HS256",
      });
      userDoc.token = token;
      userDoc.save();

      console.log("SENDING EMAIL____", email);
      transporter.sendMail({
        to: email,
        from: "pratapsinghaditya2001@gmail.com",
        subject: "Verify your account",
        html: `<p>Link: <a href='http://localhost:3000/verify/${token}'>Click here</a></p>`,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postUserLogin = (req, res, next) => {
  const email = req.body.username;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      console.log(userDoc.password);
      if (userDoc.password === password) {
        // crypto.randomBytes(32, (err, buffer) => {
        //   if (err) {
        //     const error = new Error("Something went wrong!");
        //     throw error;
        //   }
        //   token = buffer.toString('hex');
        // });
        // console.log(token);

        // const token=jwt.sign({email:email},'KhattiTatti',{
        //   algorithm: "HS256",

        // });
        // userDoc.token = token;
        // userDoc.save();

        // console.log('Token : ',token);

        //Verified user
        if (userDoc.isVerified) {
          return res.status(200).json({
            jwt: userDoc.token,
            roles: userDoc.userType,
          });
        }
        //Unverified user
        else {
          console.log("Email sent with token : ");
          res.status(200).send("Not Verified!");
          //send Email with jwt token in link
          console.log("SENDING EMAIL____", email);
          transporter.sendMail({
            to: email,
            from: "pratapsinghaditya2001@gmail.com",
            subject: "Verify your account",
            html: `<p>Link: <a href='http://localhost:3000/verify/${userDoc.token}'>Click here</a></p>`,
          });
        }
      } else {
        //email doesn't exist
        const error = new Error("Email does not exist!");
        res.status(404).json({
          msg: "Email does not exist!",
        });
        throw error;
      }
    })
    .catch((err) => {
      //email doesn't exist
      const error = new Error("Email does not exist!");
      res.status(404).json({
        msg: "Email does not exist!",
      });
      throw error;
    });
};
