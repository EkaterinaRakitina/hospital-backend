const mongoose = require('mongoose');

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  name: String,
  doctor: String,
  date: String,
  symptom: String
});

module.exports = Appointment = mongoose.model('appointments', appointmentSchema);
