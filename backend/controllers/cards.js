const Card = require('../models/card');
const ErrorBadRequest = require('../errors/error-bad-request');
const ErrorNotFound = require('../errors/error-not-found');
const ErrorForbidden = require('../errors/error-forbidden');

const STATUS_OK = 200;

module.exports.getCards = (req, res, next) => Card.find({})
  .then((cardList) => res.status(STATUS_OK).send(cardList.reverse()))
  .catch(next);

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((cardID) => res.status(STATUS_OK).send(cardID))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ErrorBadRequest('Переданы некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCardByID = (req, res, next) => Card.findById(req.params.cardId)
  .orFail(() => next(new ErrorNotFound('Карточка с указанным _id не найдена.')))
  .then((card) => {
    if (card.owner.toString() !== req.user._id) {
      throw new ErrorForbidden('Операция удаления карточки недоступна данному пользователю.');
    } else {
      Card.findByIdAndDelete(req.params.cardId)
        .then(() => res.status(STATUS_OK).send({ cardId: card._id }))
        .catch(next);
    }
  })
  .catch(next);

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new ErrorNotFound('Карточка с указанным _id не найдена.'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch(next);

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(() => new ErrorNotFound('Карточка с указанным _id не найдена.'))
  .then((card) => res.status(STATUS_OK).send(card))
  .catch(next);
