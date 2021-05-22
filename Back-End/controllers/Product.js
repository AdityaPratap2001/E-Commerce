const Product = require("../models/Product");
const User = require("../models/User");
const { use } = require("../routes/Auth");

exports.addProduct = (req, res, next) => {
  console.log(req.body);

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
          let newProd = {
            productId: newProduct._id,
            quantity: newProduct.stock,
          };

          let pushedProducts = [...userData.pushedProducts, newProd];
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
