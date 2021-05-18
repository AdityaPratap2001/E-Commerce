const User = require("../models/User");

exports.getUserDetails = (req, res, next) => {
  let email = req.params.email;
  User.findOne({ email : email })
    .then((userData)=>{
      res.status(200).json({
        roles: userData.userType
      })
    })
    .catch((err)=>{
      console.log(err);
    })
}