const express = require('express');
const router = express.Router();

const authController = require('../controllers/Auth');

// router.get('/',authController.getUserSignup);
router.post('/registeruser',authController.postUserSignup);

module.exports = router;