const express = require('express');
const router = express.Router();

const productController = require('../controllers/Product');


router.post('/api/products/addProduct',productController.addProduct);


module.exports = router;