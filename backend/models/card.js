const mongoose = require('mongoose');
// const validator = require('validator');
const URL_REGEXP = /^https?:\/\/[\da-z-]+\.[\da-z-]+\.?[\d\w\-/.]*$/i;
// Поля cхемы для данных карточки
const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (linkToCardImage) => URL_REGEXP.test(linkToCardImage),
      // validator: (linkToCardImage) => validator.isURL(linkToCardImage),
      // TODO тест image-url-validator
      message: 'Ошибка в ссылке на картинку карточки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// создание таблицы cards в базе данных mestodb
module.exports = mongoose.model('card', cardSchema);
