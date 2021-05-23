const User = require("../models/User");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const Email = require('../utils/email');
const config = require("../config/config");

exports.postUserSignup = (req, res, next) => {
  
  console.log(req.body);
  console.log(req.body.username);
  const email = req.body.username;
  const errors = validationResult(req);
  let generatedToken = null;

  if (!errors.isEmpty()) {
    const error = new Error("Validation failed");
    error.statusCode = 402;
    res.status(402).json({
      msg: "Validation failed!",
    });
    console.log(errors[0]);
    throw error;
  }

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        //email already linked to an account
        const error = new Error("Email already exisits!");
        res.status(402).json({
          msg: "Email already exists!",
        });
        throw error;
      }
    })
    .then(() => {

      const token = jwt.sign({ email: email },config.TOKEN_KEY,{
        algorithm: "HS256",
      });
      generatedToken = token;

      //Creating new user
      const newUser = new User({
        email: req.body.username,
        password: req.body.password,
        isVerified: true,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userType: req.body.roles,
        token: generatedToken,
      });
      return newUser.save();
    })
    .then(() => {
      res.status(200).json({
        msg: "User registered!",
      });

      console.log("SENDING EMAIL____");
      //sending email
      Email.sendLinkEmail(email,generatedToken);

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

      const token = jwt.sign({ email: email },config.TOKEN_KEY,{
        algorithm: "HS256",
      });
      generatedToken = token;
      
      //Password matches
      if (userDoc.password === password) {
        //Verified user
        if (userDoc.isVerified) {
          return res.status(200).json({
            jwt: userDoc.token,
            // roles: userDoc.email,
          });
        }
        //Unverified user
        else {
          console.log("Email sent with token : ");
          res.status(200).send("Not Verified!");
          //send Email with jwt token in link
          console.log("SENDING EMAIL____");
          Email.sendLinkEmail(email,generatedToken);
        }
      } 

      //Password doesn't match
      else {
        const error = new Error("Password doesn't match!");
        res.status(404).json({
          msg: "Password doesn't match",
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
