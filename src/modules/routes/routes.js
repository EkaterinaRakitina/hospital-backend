const express = require('express');
const router = express.Router();

const {
	authorizationUser,
	registrationUser,
} = require('../controllers/usersController');

//Users Routes
router.post('/authorization', authorizationUser);
router.post('/registration', registrationUser);

const {
	getAllAppointments,
	createNewAppointment,
} = require('../controllers/appointmentsController');

//Appointments
router.get('/allAppointments', getAllAppointments);
router.post('/createAppointment', createNewAppointment);

module.exports = router;
