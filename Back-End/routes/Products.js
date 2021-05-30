const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product');


router.post('/api/products/addProduct',productController.addProduct);

router.get('/api/products/featuredProducts',productController.getFeaturedProducts);

router.get('/api/products/personalisedProducts/:email',productController.getPersonalizedProducts);

router.get('/api/products/productId/:productId/:email',productController.getProductById);

router.post('/addToWishlist',productController.addToWishlist);
router.post('/removeFromWishlist',productController.removeFromWishlist);

module.exports = router;