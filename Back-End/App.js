const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require("multer");
const config = require('./config/config');
const cors = require('cors');
const app = express();






// MULTER CONFIGURATION
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, "Logo-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



// Middleware for parsing the request body 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);



//CORS HEADERS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});




// ROUTING REQUESTS
const authRoute = require('./routes/Auth');
const userRoute = require('./routes/User');
const productRoute = require('./routes/Products');
app.use(authRoute,userRoute,productRoute);




//Handling Errors
app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const data = error.data;
  const message = error.message;

  res.status(status).json({
    message: message,
    data: data,
  });
});



//Connection to Mongo-database
const MONGO_URI = `mongodb+srv://Aditya:${config.MONGO_PASSWORD}@cluster0.ke6yn.mongodb.net/E-Commerce`;

mongoose.connect(MONGO_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    app.listen(8080);
    console.log('Server Running!!!');
  })
  .catch((err)=>{
    console.log(err);
  })