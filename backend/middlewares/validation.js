const { celebrate, Joi } = require('celebrate');

const URL_REGEXP = /^https?:\/\/[\da-z-]+\.[\da-z-]+\.?[\d\w\-/.]*$/i;

const validateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(URL_REGEXP), // ?? uri() don't work
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const validateUserID = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const validateAvatar = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(URL_REGEXP),
  }),
});

const validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validateCard = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(URL_REGEXP), // ?? uri() don't work
  }),
});

const validateCardID = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = {
  validateUser,
  validateUserID,
  validateUserInfo,
  validateAvatar,
  validateLogin,
  validateCard,
  validateCardID,
};
