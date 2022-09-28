const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const ErrorNotAuthorized = require('../errors/error-not-authorized');

const URL_REGEXP = /^https?:\/\/[\da-z-]+\.[\da-z-]+\.?[\d\w\-/.]*$/i;
// Поля схемы пользователя
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (linkToImage) => URL_REGEXP.test(linkToImage),
      // validator: (linkToImage) => validator.isURL(linkToImage),
      // TODO тест image-url-validator
      message: 'Ошибка в ссылке на аватар',
    },
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Ошибка в email пользователя',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new ErrorNotAuthorized('Ошибка в паре email и/или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new ErrorNotAuthorized('Ошибка в паре email и/или пароль');
          }
          return user;
        });
    });
};
// Создание модели-таблицы users в базе данных mestodb
module.exports = mongoose.model('user', userSchema);
