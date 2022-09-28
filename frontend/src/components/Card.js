import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function Card(props) {
  function handleCardClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }
  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }
  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = props.card.owner._id === currentUser._id;

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = props.card.likes.some((i) => i._id === currentUser._id);
  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = `element__group-button ${
    isLiked && "element__group-button_black"
  }`;

  return (
    <li className="element">
      <img
        className="element__image"
        src={`${props.card.link}`}
        alt={`${props.card.name}`}
        onClick={handleCardClick}
      />
      {isOwn && (
        <button
          className="element__trash"
          type="button"
          title="Удалить"
          aria-label="Удалить"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__group">
        <h2 className="element__group-text">{props.card.name}</h2>
        <div className="element__group-button-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            title="Лайк"
            aria-label="Лайк"
            onClick={handleLikeClick}
          ></button>
          <p className="element__group-button-number">
            {props.card.likes.length}
          </p>
        </div>
      </div>
    </li>
  );
}
