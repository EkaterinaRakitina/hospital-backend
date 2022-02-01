const User = require('../../db/models/users/userSchema');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { secret } = require('./config');

const generateAccessToken = (id) => {
  const payload = { id };
  return jwt.sign(payload, secret, {expiresIn: "24h"});
} 

module.exports.autorisationUser = (req, res, next) => {
  const { login, password } = req.body;

  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
    User.findOne({ login }).then((result) => {
      if(result) {
        const validPassword = bcrypt.compareSync(password, result.password);
        if (!validPassword) {
          res.status(404).send('Введен не верный пароль');
        }
        const token = generateAccessToken(result._id);
        res.send({ token });
      }else {
        res.status(404).send(`Пользователь ${login} не найден`);
      }
      })
  } else {
    res.status(404).send('Autorisation error');
  }
};

module.exports.registrationUser = (req, res, next) => {
  const { login, password } = req.body;
  if (req.body.hasOwnProperty('login') && req.body.hasOwnProperty('password')) {
    const hashPassword = bcrypt.hashSync(password, 7);
    const user = new User({ login, password: hashPassword });
    User.findOne({ login }).then((result) => {
      if(result) {
        res.status(404).send('Пользователь с таким именем уже существует');
      }else {
        user.save().then((result) => {
          res.send({ data: result });
        });
      }
    });
  } else {
    res.status(404).send('Registration error');
  }
};
