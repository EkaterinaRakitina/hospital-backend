const express = require('express');
const router = express.Router();

const {
	getAllUsers,
	createNewUser,
} = require('../controllers/usersController');

//Users Routes
router.get('/autorisation', getAllUsers);
router.post('/registration', createNewUser);

module.exports = router;
