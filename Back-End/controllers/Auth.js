const User = require('../models/User');

exports.postUserSignup = (req,res,next) => {

  console.log(req.body.username);
  const email = req.body.username;
  User.findOne({ email : email })
    .then((userDoc)=>{
      if(userDoc){
        //id exists
        const error = new Error('Email already exisits!');
        throw error;
      }
    })
    .then(()=>{
      const newUser = new User({
        email: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        userType: req.body.roles 
      })
      return newUser.save();
    })
    .then(()=>{
      res.status(200).json({
        msg: 'User registered!'
      });
    })
    .catch((err)=>{
      console.log(err)
    })

}