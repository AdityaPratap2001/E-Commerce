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


//FOR FETCHING BUYER'S WISHLIST
exports.fetchWishlist = (req,res,send) => {

  let email = req.params.email;
  let wishlistedProducts = [];

  User.findOne({ email: email })
    .then((userData) => {

      userData.wishlist.map((product) => {
        wishlistedProducts.push(product);
      })

      res.status(200).json([...wishlistedProducts]);

    })
    .catch((err) => {
      throw err;
    })

}


//FOR FETCHING BUYER'S CART
exports.fetchCart = (req,res,send) => {

  let email = req.params.email;
  let cartProductsList = [];
  let cartValue = 0;

  User.findOne({ email: email })
    .then((userData) => {

      userData.cart.map((cartProduct) => {

        let isInMyWishlist = false;
        userData.wishlist.map((wishlistProduct) => {
          // console.log(`${cartProduct.product._id} --- ${wishlistProduct._id}`)
          if(wishlistProduct._id == cartProduct.product._id){
            isInMyWishlist = true;
          }
        })

        let cartObj = {
          product: cartProduct.product,
          quantity: cartProduct.quantity,
          isInMyWishlist: isInMyWishlist,
        }

        // console.log(cartObj);
        cartProductsList.push(cartObj);
        cartValue += cartProduct.product.price;
      })

      res.status(200).json({
        list: [...cartProductsList],
        cartValue: cartValue,
      });

    })
    .catch((err) => {
      throw err;
    })

}