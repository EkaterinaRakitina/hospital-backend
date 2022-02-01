const express = require('express');
const router = express.Router();

const {
	authorizationUser,
	registrationUser,
} = require('../controllers/usersController');

//Users Routes
router.post('/authorization', authorizationUser);
router.post('/registration', registrationUser);

module.exports = router;
