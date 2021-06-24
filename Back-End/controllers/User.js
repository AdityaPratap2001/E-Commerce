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

// FOR SELLER
exports.getUploadedProducts = (req, res, next) => {
  let sellerEmail = req.params.email;

  // console.log(`Seller -> ${email}`);
  User.findOne({ email: sellerEmail })
    .populate("pushedProducts")
    .exec()
    .then((userData) => {
      // console.log(userData.pushedProducts);
      res.status(200).json([...userData.pushedProducts]);
    })
    .catch((err) => {
      throw err;
    });
};

//FOR FETCHING BUYER'S WISHLIST
exports.fetchWishlist = (req, res, send) => {
  let email = req.params.email;

  User.findOne({ email: email })
    .populate("wishlist")
    .exec()
    .then((userData) => {
      res.status(200).json([...userData.wishlist]);
    })
    .catch((err) => {
      throw err;
    });
};

//FOR FETCHING BUYER'S CART
exports.fetchCart = (req, res, send) => {
  let userEmail = req.params.email;

  User.findOne({ email: userEmail })
    .populate({
      path: "cart",
      populate: {
        path: "product",
      },
    })
    .then((userData) => {
      
      let cartList = [];
      let cartValue = 0;
      userData.cart.map((cartItem) => {

        // Finding if product exists in wishlist already
        let isInMyWishlist = false;
        if(userData.wishlist.indexOf(cartItem.product._id.toString()) !== -1){
          isInMyWishlist = true;
        }

        let cartItemData = {
          product: cartItem.product,
          quantity: cartItem.quantity,
          isInMyWishlist: isInMyWishlist,
        }

        cartValue += (cartItem.product.price * cartItem.quantity);
        cartList.push(cartItemData);
 
      })

      let cartData = {
        list: cartList,
        cartValue: cartValue
      }
      res.status(200).json(cartData);

    })
    .catch((err) => {
      throw err;
    });

};
