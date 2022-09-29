const jwt = require('jsonwebtoken');
const ErrorNotAuthorized = require('../errors/error-not-authorized');
require('dotenv').config();

const { NODE_ENV, JWT_SECRET = 'dev-secret' } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new ErrorNotAuthorized());
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(new ErrorNotAuthorized());
  }
  req.user = payload;

  next();
};

// module.exports = (req, res, next) => {
//   const token = req.cookies.jwt;
//   if (!token) {
//     throw new ErrorNotAuthorized();
//   }
//   let payload;
//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
//   } catch (err) {
//     next(new ErrorNotAuthorized());
//   }
//   req.user = payload;
//   return next();
// };