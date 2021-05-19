const express = require('express');
const router = express.Router();

const userController = require('../controllers/User');

router.get('/user/:email',userController.getUserDetails);

router.post('/editUser',userController.editProfileDetails);

router.post('/editPassword',userController.changePassword);


module.exports = router;