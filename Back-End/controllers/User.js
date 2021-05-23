const User = require("../models/User");
const Product = require("../models/Product");

exports.getUserDetails = (req, res, next) => {
  let email = req.params.email;
  User.findOne({ email: email })
    .then((userData) => {
      let UserData = {
        username: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        gender: userData.gender,
        wishElem: userData.wishlist.length,
        cartElem: userData.cart.length,
        role: userData.userType,
      };

      // console.log(UserData);
      res.status(200).json(UserData);
    })
    .catch((err) => {
      console.log(err);
      const error = new Error("Something went wrong!");
      throw error;
    });
};

exports.editProfileDetails = (req, res, next) => {
  let email = req.body.username;
  User.findOne({ email: email })
    .then((userData) => {
      userData.firstName = req.body.firstName;
      userData.lastName = req.body.lastName;
      userData.gender = req.body.gender;
      userData.save();
      res.status(200).json({});
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.changePassword = (req, res, next) => {
  let email = req.body.username;
  User.findOne({ email: email })
    .then((userData) => {
      if (userData.password === req.body.password) {
        userData.password = req.body.newPassword;
        userData.save();
        res.status(200).send("Password changed successfully");
      } else {
        res.status(404).send("Incorrect Old-password");
      }
    })
    .catch((err) => {
      res.status(404);
    });
};


exports.getUploadedProducts = (req, res, next) => {
  let email = req.params.email;
  let pushedArray = [];
  User.findOne({ email: email })
    .then((userData) => {
      userData.pushedProducts.map((productData) => {
        let prodObj = {
            id: productData._id,
            seller: email,
            name: productData.name,
            prodType: productData.productType,
            price: productData.price,
            material: productData.material,
            category: productData.category,
            subCategory: productData.subCategory,
            stock: productData.stock,
            fit: productData.fit,
        };
        pushedArray.push(prodObj);
      });
      // console.log(pushedArray);
    })
    .then(() => {
      // console.log(pushedArray);
      res.status(200).json(
        [...pushedArray]
      )
    })
    .catch((err) => {
      throw err;
    });
};
