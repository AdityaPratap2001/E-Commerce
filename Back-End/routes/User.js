const express = require('express');
const router = express.Router();

const userController = require('../controllers/User');

router.get('/user/:email',userController.getUserDetails);


module.exports = router;