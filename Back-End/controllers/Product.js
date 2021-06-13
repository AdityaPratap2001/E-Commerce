const Product = require("../models/Product");
const User = require("../models/User");
const crypto = require("crypto");


exports.getFeaturedProducts = (req, res, next) => {

  let featuredProducts = [];
  Product.find()
    .then((productsList) => {
      // console.log(productsList);
      productsList.map((product) => {
        featuredProducts.push({
          id: product._id,
          pic: product.imageUrl,
          seller: product.brand,
          name: product.name,
          price: product.price,
        });
      });

      // console.log(featuredProducts);
      res.status(200).json([...featuredProducts]);
    })
    .catch((err) => {
      throw err;
    });
};




exports.getPersonalizedProducts = (req, res, next) => {
  let email = req.params.email;
  let personalizedProducts = [];
  let gender = null;

  User.findOne({ email: email })
    .then((userData) => {
      gender = userData.gender;
    })
    .then(() => {
      Product.find().then((productList) => {
        productList.map((product) => {
          if (gender === "male" && product.category === "Men") {
            personalizedProducts.push({
              id: product._id,
              pic: product.imageUrl,
              seller: product.brand,
              name: product.name,
              price: product.price,
            });
          } 
          else if (gender === "female" && product.category === "Women") {
            personalizedProducts.push({
              id: product._id,
              pic: product.imageUrl,
              seller: product.brand,
              name: product.name,
              price: product.price,
            });
          }
        });
        res.status(200).json([...personalizedProducts]);
      });

    })
    .catch((err) => {
      throw err;
    });
};







exports.getProductById = (req,res,next) => {

  const productId = req.params.productId;
  const email = req.params.email;

  Product.findOne({ _id: productId })
    .then((productData) => {
      
      User.findOne({ email: email })
        .then((userData) => {
          
          let inWishlist = false;
          let inCart = false;
          userData.wishlist.map((product) => {
            if(product._id == productId){
              inWishlist = true;
            }
          })
          userData.cart.map((product) => {
            if(product.product._id == productId){
              inCart = true;
            }
          })
          res.status(200).json({
            seller: productData.brand,
            name: productData.name,
            price: productData.price,
            prodType: productData.productType,
            fit: productData.fit,
            material: productData.material,
            picture: productData.imageUrl,
            category: productData.category,
            subCategory: productData.subCategory,
            isWishlisted: inWishlist,
            isInCart: inCart,
          })
          
        })
        .catch((err) => {
          throw err;
        })
    })
    .catch((err) => {
      throw err;
    })

}







exports.getCategoryProduct = (req, res, next) => {

  let category = req.params.mainCategory;
  // console.log(category);

  let categoryProducts = [];

  Product.find()
    .then((productData) => {

      productData.map((product) => {
        if(product.category === category)
        categoryProducts.push(product);
      })

      // console.log(categoryProducts);
      res.status(200).json([...categoryProducts]);

    })
    .catch((err) => {
      console.log(err);
      throw err;
    })

}








exports.addProduct = (req, res, next) => {

  let sellerID = null;
  User.findOne({ email: req.body.sellerUsername })

    .then((userData) => {
      sellerID = userData._id;
      const newProduct = new Product({
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        brand: req.body.seller,
        category: req.body.category,
        subCategory: req.body.subCategory,
        fit: req.body.fit,
        material: req.body.material,
        productType: req.body.prodType,
        sellerId: sellerID,
        imageUrl: req.file.path,
      });
      newProduct
        .save()
        .then(() => {
          let pushedProducts = [...userData.pushedProducts, newProduct];

          userData.pushedProducts = pushedProducts;
          userData.save().then(() => {
            return res.status(200).send("Product uploaded successfully!");
          });
        })
        .catch((err) => {
          const error = new Error("Unverified seller" + err);
          error.status = 404;
          throw error;
        });
    })

    .catch((err) => {
      const error = new Error("Unverified seller" + err);
      error.status = 404;
      throw error;
    });
};



// WISHLIST CONTROLLER
exports.addToWishlist = (req,res,next) => {

  let userEmail = req.body.username;
  let productId = req.body.productId;

  let selectedProduct = {};

  Product.findOne({ _id: productId })
    .then((productData) => {
      selectedProduct = productData;
      return selectedProduct
    })
    .then((selectedProduct) => {
      User.findOne({ email: userEmail })
        .then((userData) => {

          let wishlistedList = [...userData.wishlist];
          wishlistedList.push(selectedProduct);

          userData.wishlist = wishlistedList;
          userData.save();

          res.status(200).send("Product added to wishlist");
        })
        .catch((err) => {
          throw err;
        })
    })
    .catch((err) => {
      throw err;
    })
}


exports.removeFromWishlist = (req,res,next) => {

  let userEmail = req.body.username;
  let productId = req.body.productId;


  Product.findOne({ _id: productId })
    .then((productData) => {
      return productData
    })
    .then((productData) => {
      User.findOne({ email: userEmail })
        .then((userData) => {

          let wishlistedList = [];
          userData.wishlist.map((wishlistProduct) => {
            if(wishlistProduct._id != productId){
              wishlistedList.push(wishlistProduct);
            }
          })
          userData.wishlist = wishlistedList;
          userData.save();

          res.status(200).send("Product removed from wishlist");
        })
        .catch((err) => {
          throw err;
        })

    })
    .catch((err) => {
      throw err
    })

}




// CART CONTROLLER
exports.addToCart = (req,res,send) => {
  
  let userEmail = req.body.username;
  let productId = req.body.productId;
  let productQuantity = req.body.productAmt;

  let selectedProduct = {};
  
  Product.findOne({ _id: productId })
    .then((productData) => {

      // console.log(productData);
      if(productData.stock < productQuantity){
        const error = new Error("");
        error.statusCode = 422;
        error.data = {
          msg: "Items out of stock, trying adding less quantity!",
        };
        throw error;
      }

      selectedProduct = productData;
      return selectedProduct;
    })
    .then((selectedProduct) => {

      User.findOne({ email: userEmail })
        .then((userData) => {

          let newCart = [...userData.cart];
          newCart.push({
            product: selectedProduct,
            quantity: Number(productQuantity)
          })

          userData.cart = newCart;
          userData.save();

          res.status(200).send("Product added to cart");
        })
        .catch((err) => {
          throw err;
        })

    })
    .catch((err) => {
      throw err;
    })

}


exports.removeFromCart = (req,res,next) => {

  let userEmail = req.body.username;
  let productId = req.body.productId;

  let selectedProduct = {};

  Product.findOne({ _id: productId })
    .then((productData) => {
      return productData;
    })
    .then((productData)=>{

      User.findOne({ email: userEmail })
        .then((userData) => {

          let newCart = [];
          userData.cart.map((cartItem) => {
            if(cartItem.product._id != productId){
              newCart.push(cartItem);
            }
          })

          userData.cart = newCart;
          userData.save();

          res.status(200).send("Product removed from cart!");
        })
        .catch((err) => {
          throw err;
        })
    })
    .catch((err) => {
      throw err;
    })

}


exports.moveFromCartToWishlist = (req,res,next) => {

  let userEmail = req.body.username;
  let productId = req.body.productId;

  User.findOne({ email: userEmail })
    .then((userData) => {

      Product.findOne({ _id: productId })
        .then((productData) => {
          let newWislist = [...userData.wishlist];
          newWislist.push(productData);

          userData.wishlist = newWislist;
          userData.save();
        })
        .then(() => {
          let newCartList = [];
          userData.cart.push((cartProduct) => {
            if(cartProduct.product._id != productId){
              newCartList.push(cartProduct);
            }
          })

          userData.cart = newCartList;
          userData.save();

          res.status(200).send('Product successfullly moved to wishlist!')
        })
        .catch((err) => {
          throw err;
        })
    })
    .catch((err) => {
      throw err;
    })

}


// PLACING ORDER
exports.placeOrder = (req,res,next) => {

  let userEmail = req.body.email;

  User.findOne({ email: userEmail })
    .then((userData) => {

      let orderValue = 50;
      let orderDate = new Date(); 
      let orderList = [];
      
      userData.cart.map((cartItem) => {
        orderList.push(cartItem);
        orderValue += (cartItem.product.price * cartItem.quantity);
      })
       
      let newOrder = {
        orderValue: orderValue,
        orderDate: orderDate,
        productList: orderList,
        orderId: crypto.randomBytes(12).toString("hex"),
      }

      let newOrderList = [...userData.orders];
      newOrderList.push(newOrder);

      userData.orders = newOrderList;
      userData.cart = [];
      console.log(newOrderList);
      userData.save();

      res.status(200).send('Order placed successfully!');
    })
    .catch((err) => {
      throw err;
    })

}


// GET PAST-ORDERS
exports.getPastOrders = (req,res,send) => {

  let userEmail = req.params.email;

  User.findOne({ email: userEmail })
    .then((userData) => {

      res.status(200).send(userData.orders);

    })
    .catch((err) => {
      throw err;
    })

}