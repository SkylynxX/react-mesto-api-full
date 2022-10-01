const routerIndex = require('express').Router();
const {
  login,
  createUser,
} = require('../controllers/users');

const {
  validateUser,
  validateLogin,
} = require('../middlewares/validation');

routerIndex.post('/signin', validateLogin, login);
routerIndex.post('/signup', validateUser, createUser);

module.exports = routerIndex;
