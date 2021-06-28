const express = require("express");
const router = express.Router();

// const cache = (req,res,next) => {

//   const { productId } = req.params;

//   client.get(productId,(err,data) => {

//     if(err){
//       throw err;
//     }
//     if(data !== null){
//       res.send('Hello');
//     }
//     else{
//       next();
//     }

//   })

// }

const productController = require("../controllers/Product");

// Adding product to DB
router.post("/api/products/addProduct", productController.addProduct);

// Fetching products-data
router.get(
  "/api/products/featuredProducts",
  productController.getFeaturedProducts
);
router.get(
  "/api/products/personalisedProducts/:email",
  productController.getPersonalizedProducts
);
router.get(
  "/api/products/productId/:productId/:email",
  productController.getProductById
);

// Category-wise products fetching
router.get(
  "/api/products/productCategory/:mainCategory",
  productController.getCategoryProduct
);
router.get(
  "/api/products/productSubCategory/:mainCategory/:subCategory",
  productController.getSubCategoryProduct
);

// WISHLIST
router.post("/addToWishlist", productController.addToWishlist);
router.post("/removeFromWishlist", productController.removeFromWishlist);

// CART
router.post("/addToCart", productController.addToCart);
router.post("/removeFromCart", productController.removeFromCart);
router.post("/cartToWishlist", productController.moveFromCartToWishlist);
router.post("/placeOrder", productController.placeOrder);
router.get("/orderHistory/:email", productController.getPastOrders);

// SEARCH
router.get(
  "/api/products/productType/:query",
  productController.returnSearchResults
);
router.get(
  "/api/products/productCategory/productType/:gender/:query",
  productController.returnGenderSearchResults
);

module.exports = router;
