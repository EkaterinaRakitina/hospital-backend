const express = require('express');
const router = express.Router();

const {
	autorisationUser,
	registrationUser,
} = require('../controllers/usersController');

//Users Routes
router.post('/autorisation', autorisationUser);
router.post('/registration', registrationUser);

module.exports = router;
