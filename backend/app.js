require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const routerIndex = require('./routes/index');
const routerUsers = require('./routes/users');
const routerCards = require('./routes/cards');
const cors = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const errorJSON = require('./middlewares/error-json');
const ErrorNotFound = require('./errors/error-not-found');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(cors);

// app.use(cookieParser());
app.use(bodyParser.json()); // подключение готового парсера для обработки запросов
app.use(requestLogger); // подключаем логгер запросов
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.use(routerIndex);

app.use(auth);

app.use(routerUsers);
app.use(routerCards);

app.use('*', (req, res, next) => next(new ErrorNotFound()));
app.use(errorLogger);
app.use(errors());
app.use(errorJSON);
app.listen(PORT, () => {
  console.log(`Сервер запущен. доступен по адрессу http://localhost:${PORT}`);
});
