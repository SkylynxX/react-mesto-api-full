const routerCards = require('express').Router();

const {
  getCards,
  createCard,
  deleteCardByID,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

const {
  validateCard,
  validateCardID,
} = require('../middlewares/validation');

routerCards.get('/cards', getCards);
routerCards.post('/cards', validateCard, createCard);
routerCards.delete('/cards/:cardId', validateCardID, deleteCardByID);
routerCards.put('/cards/:cardId/likes', validateCardID, likeCard);
routerCards.delete('/cards/:cardId/likes', validateCardID, dislikeCard);

module.exports = routerCards;
