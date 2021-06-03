const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product');


router.post('/api/products/addProduct',productController.addProduct);

router.get('/api/products/featuredProducts',productController.getFeaturedProducts);

router.get('/api/products/personalisedProducts/:email',productController.getPersonalizedProducts);

router.get('/api/products/productId/:productId/:email',productController.getProductById);

// WISHLIST
router.post('/addToWishlist',productController.addToWishlist);
router.post('/removeFromWishlist',productController.removeFromWishlist);

// CART
router.post('/addToCart',productController.addToCart);
router.post('/removeFromCart',productController.removeFromCart);
router.post('/cartToWishlist',productController.moveFromCartToWishlist);


module.exports = router;