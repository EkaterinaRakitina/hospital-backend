const Appointment = require('../../db/models/appointments/appointmentSchema');

module.exports.getAllAppointments = (req, res, next) => {
  Appointment.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewAppointment = (req, res, next) => {
  if (
    req.body.hasOwnProperty('name') &&
    req.body.hasOwnProperty('doctor') &&
    req.body.hasOwnProperty('date') &&
    req.body.hasOwnProperty('symptom')
  ) {
    const appointment = new Appointment(req.body);
    appointment.save().then((result) => {
      Appointment.find().then((result) => {
        res.send({ data: result });
      });
    });
  } else {
    res.status(404).send('Somthing wrong');
  }
};
