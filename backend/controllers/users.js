const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const ErrorBadRequest = require('../errors/error-bad-request');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorConflict = require('../errors/error-conflict');

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;
// console.log(NODE_ENV === 'production');
// console.log(JWT_SECRET);

module.exports.getUsers = (req, res, next) => User.find({})
  .then((users) => res.send(users))
  .catch(next);

module.exports.getUserByID = (req, res, next) => User.findById(req.params.userId)
  .orFail(() => next(new ErrorNotFound('Пользователь с указанным _id не найдена.')))
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'CastError') {
      next(new ErrorBadRequest('Переданы некорректные для получения пользователя.'));
    } else {
      next(err);
    }
  });

module.exports.getUser = (req, res, next) => User.findById(req.user._id)
  .orFail(() => next(new ErrorNotFound('Пользователь с указанным _id не найдена.')))
  .then((user) => res.send(user))
  .catch(next);

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ErrorConflict('Пользователь с такими дааными уже зарегистрирован.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUserInfoByID = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  {
    name: req.body.name,
    about: req.body.about,
  },
  {
    runValidators: true,
    new: true,
  },
)
  .then((user) => {
    if (!user) {
      throw new ErrorNotFound('Пользователь по указанному _id не найден.');
    }
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest('Переданы некорректные данные при создании пользователя.'));
    } else {
      next(err);
    }
  });

module.exports.updateUserAvatarByID = (req, res, next) => User.findByIdAndUpdate(
  req.user._id,
  { avatar: req.body.avatar },
  {
    new: true,
    runValidators: true,
  },
)
  .orFail(() => next(new ErrorNotFound('Пользователь с указанным _id не найдена.')))
  .then((user) => {
    res.send(user);
  })
  .catch((err) => {
    if (err.name === 'ValidationError') {
      next(new ErrorBadRequest('Переданы некорректные данные при создании пользователя.'));
    } else {
      next(err);
    }
  });

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
        { expiresIn: '7d' },
      );
      res
        .send({ token });
    })
    .catch(next);
};

// module.exports.signout = (req, res) => {
//   res.clearCookie('jwt').send({ message: 'Выход' });
// };
