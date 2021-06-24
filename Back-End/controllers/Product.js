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
          } else if (gender === "female" && product.category === "Women") {
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

exports.getProductById = (req, res, next) => {
  const productId = req.params.productId;
  const email = req.params.email;

  Product.findOne({ _id: productId })
    .then((productData) => {
      User.findOne({ email: email })
        .then((userData) => {
          let inWishlist = false;
          let inCart = false;
          userData.wishlist.map((product_id) => {
            if (product_id.toString() === productId.toString()) {
              inWishlist = true;
            }
          });
          userData.cart.map((product) => {
            if (product.product._id.toString() === productId.toString()) {
              inCart = true;
            }
          });

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
          });
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

exports.getCategoryProduct = (req, res, next) => {
  let category = req.params.mainCategory;
  let categoryProducts = [];

  Product.find()
    .then((productData) => {
      productData.map((product) => {
        if (product.category === category) categoryProducts.push(product);
      });

      // console.log(categoryProducts);
      res.status(200).json([...categoryProducts]);
    })
    .catch((err) => {
      console.log(err);
      throw err;
    });
};

exports.getSubCategoryProduct = (req, res, next) => {
  let category = req.params.mainCategory;
  let sub_category = req.params.subCategory;

  Product.find()
    .then((products) => {
      let displayProducts = [];
      products.map((product) => {
        if (
          product.category === category &&
          product.subCategory === sub_category
        ) {
          displayProducts.push(product);
        }
      });

      res.status(200).json([...displayProducts]);
    })
    .catch((err) => {
      throw err;
    });
};

exports.addProduct = (req, res, next) => {
  User.findOne({ email: req.body.sellerUsername })

    .then((userData) => {
      let sellerID = userData._id;
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
          let pushedProducts = [...userData.pushedProducts, newProduct._id];

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

//-------WISHLIST-CONTROLLER-------------//

exports.addToWishlist = (req, res, next) => {
  let userEmail = req.body.username;
  let productId = req.body.productId;

  Product.findOne({ _id: productId })
    .then(() => {
      User.findOne({ email: userEmail })
        .then((userData) => {
          let newWislist = [...userData.wishlist, productId];
          userData.wishlist = newWislist;
          userData.save();

          res.status(200).send("Product added to wishlist");
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

exports.removeFromWishlist = (req, res, next) => {
  let userEmail = req.body.username;
  let productId = req.body.productId;

  User.findOne({ email: userEmail })
    .populate("wishlist")
    .then((userData) => {
      let newWishlist = [];
      userData.wishlist.map((product) => {
        if (product._id.toString() !== productId.toString()) {
          newWishlist.push(product._id);
        }
      });

      userData.wishlist = newWishlist;
      userData.save();
      res.status(200).send("Product removed from wishlist");
    })
    .catch((err) => {
      throw err;
    });
};

//-----------CART-CONTROLLER-----------//

exports.addToCart = (req, res, send) => {
  let userEmail = req.body.username;
  let productId = req.body.productId;
  let productQuantity = req.body.productAmt;

  Product.findOne({ _id: productId })
    .then((productData) => {
      if (productData.stock < productQuantity) {
        res.status(422).send({
          msg: "Items out of stock, trying adding lesser quantity!",
        });
      }

      // If stocks for product is available
      User.findOne({ email: userEmail })
        .then((userData) => {
          let newProduct = {
            product: productId,
            quantity: productQuantity,
          };

          let newCart = [...userData.cart, newProduct];
          userData.cart = newCart;
          userData.save();

          res.status(200).send("Product added to cart");
        })
        .catch((err) => {
          throw err;
        });
    })
    .catch((err) => {
      throw err;
    });
};

exports.removeFromCart = (req, res, next) => {
  let userEmail = req.body.username;
  let productId = req.body.productId;

  User.findOne({ email: userEmail })
    .populate({
      path: "cart",
      populate: {
        path: "product",
      },
    })
    .then((userData) => {
      let newCart = [];
      userData.cart.map((cartItem) => {
        if (cartItem.product._id.toString() !== productId.toString()) {
          newCart.push(cartItem);
        }
      });

      userData.cart = newCart;
      userData.save();
      res.status(200).send("Product removed from cart!");
    })
    .catch((err) => {
      throw err;
    });
};

exports.moveFromCartToWishlist = (req, res, next) => {
  let userEmail = req.body.username;
  let productId = req.body.productId;

  User.findOne({ email: userEmail })
    .then((userData) => {
      let newCart = [];
      userData.cart.map((cartItem) => {
        if (cartItem.product._id.toString() !== productId.toString()) {
          newCart.push(cartItem);
        }
      });

      let newWishlist = [...userData.wishlist];
      if (userData.wishlist.indexOf(productId.toString()) === -1) {
        newWishlist.push(productId);
      }

      userData.cart = newCart;
      userData.wishlist = newWishlist;
      userData.save();

      res.status(200).send("Product successfullly moved to wishlist!");
    })
    .catch((err) => {
      console.log(err);
    });
};

//------ORDERS--------//

// PLACING ORDER
exports.placeOrder = (req, res, next) => {
  let userEmail = req.body.email;

  User.findOne({ email: userEmail })
    .populate({
      path: "cart",
      populate: {
        path: "product",
      },
    })
    .then((userData) => {
      let orderTotal = 50;
      let orderDate = new Date();
      let orderList = [];

      userData.cart.map((cartItem) => {
        orderList.push(cartItem);
        orderTotal +=
          Number(cartItem.product.price) * Number(cartItem.quantity);

        Product.findOne({ _id: cartItem.product._id }).then((productData) => {
          let newStock = productData.stock - cartItem.quantity;
          productData.stock = newStock;
          productData.save();
        });
      });

      let newOrder = {
        orderValue: orderTotal,
        orderDate: orderDate.toString(),
        productList: orderList,
        orderId: crypto.randomBytes(12).toString("hex"),
      };

      let newOrderList = [...userData.orders, newOrder];
      userData.orders = newOrderList;
      userData.cart = [];
      userData.save();

      res.status(200).send("Order placed successfully!");
    })
    .catch((err) => {
      throw err;
    });
};

// GET PAST-ORDERS
exports.getPastOrders = (req, res, send) => {
  let userEmail = req.params.email;

  User.findOne({ email: userEmail })
    .populate({
      path: "orders",
      populate: {
        path: "productList",
        populate: {
          path: "product",
        },
      },
    })
    .then((userData) => {
      let pastOrders = userData.orders;
      res.status(200).send(pastOrders);
    })
    .catch((err) => {
      throw err;
    });
};
