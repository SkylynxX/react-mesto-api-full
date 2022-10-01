const routerUsers = require('express').Router();
const {
  getUsers,
  getUserByID,
  getUser,
  updateUserInfoByID,
  updateUserAvatarByID,
  // signout,
} = require('../controllers/users');

const {
  validateUserID,
  validateUserInfo,
  validateAvatar,
} = require('../middlewares/validation');

// routerUsers.get('/signout', signout);
routerUsers.get('/users', getUsers);
routerUsers.get('/users/me', getUser);
routerUsers.get('/users/:userId', validateUserID, getUserByID);
routerUsers.patch('/users/me', validateUserInfo, updateUserInfoByID);
routerUsers.patch('/users/me/avatar', validateAvatar, updateUserAvatarByID);

module.exports = routerUsers;
