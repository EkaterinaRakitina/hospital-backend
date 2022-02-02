const User = require('../../db/models/users/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('../../../config');

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, { expiresIn: '24h' });
};

module.exports.authorizationUser = (req, res, next) => {
  const { login, password } = req.body;

  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
    User.findOne({ login }).then((result) => {

      if (result) {
        const validPassword = bcrypt.compareSync(password, result.password);
        if (!validPassword) {
          res.status(404).send('Wrong password');
        }
        const token = generateAccessToken(result._id);
        res.send({ token });
      } else {
        res.status(404).send(`A user ${login} is not found`);
      }
    });
  } else {
    res.status(404).send('Authorization error');
  }
};

module.exports.registrationUser = (req, res, next) => {
  const { login, password } = req.body;
  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ login, password: hashPassword });
    User.findOne({ login }).then((result) => {

      if (result) {
        res.status(404).send('A user with the same name already exists');
      } else {
        user.save().then((result) => {
          const token = generateAccessToken(result._id);
          res.send({ data: result, token });
        });
      }
    });
  } else {
    res.status(404).send('Registration error');
  }
};
