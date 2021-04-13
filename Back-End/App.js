const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoute = require('./routes/Auth');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(cors());

// app.use((req, res, next) =>{  // To remove CROS (cross-resource-origin-platform) problem 
//   res.setHeader('Access-Control-Allow-Origin',"*"); // to allow all client we use *
//   res.setHeader('Access-Control-Allow-Methods',"OPTIONS,GET,POST,PUT,PATCH,DELETE"); //these are the allowed methods 
//   res.setHeader('Access-Control-Allow-Headers', "*"); // allowed headers (Auth for extra data related to authoriaztiom)
//   next();
// })

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

app.use(authRoute);

const MONGO_URI = "mongodb+srv://Aditya:aditya@cluster0.ke6yn.mongodb.net/AuthDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI,{ useUnifiedTopology: true,useNewUrlParser: true })
  .then(()=>{
    app.listen(8080);
    console.log('Server Running!!!');
  })
  .catch((err)=>{
    console.log(err);
  })