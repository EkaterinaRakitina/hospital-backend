const User = require('../../db/models/users/userSchema');

module.exports.getAllUsers = (req, res, next) => {
  User.find().then((result) => {
    res.send({ data: result });
  });
};

module.exports.createNewUser = (req, res, next) => {
    const user = new User(req.body);
    user
      .save()
      .then((result) => {
        User.find().then(result => {
          res.send({ data: result });
        });
      })
      .catch((err) => console.log(err));
};