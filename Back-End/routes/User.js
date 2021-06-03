const express = require('express');
const router = express.Router();

const userController = require('../controllers/User');

router.get('/user/:email',userController.getUserDetails);

router.post('/editUser',userController.editProfileDetails);

router.post('/editPassword',userController.changePassword);

router.get('/api/products/getSellerProduct/:email',userController.getUploadedProducts);

router.get('/myWishlist/:email',userController.fetchWishlist);
router.get('/myCart/:email',userController.fetchCart);

module.exports = router;