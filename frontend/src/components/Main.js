import React, { useState, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { Card } from "./Card";

export function Main(props) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="page">
      <section className="profile">
        <a
          className="profile__avatar-link"
          href="#"
          onClick={props.onEditAvatarClick}
        >
          <img
            className="profile__avatar"
            src={currentUser.avatar}
            alt="аватарка профиля"
          />
        </a>
        <div className="profile__info">
          <div className="profile__title-box">
            <h1 className="profile__title">{currentUser.name}</h1>
            <button
              className="profile__edit-button"
              type="button"
              title="Редактировать профиль"
              aria-label="Редактировать профиль"
              onClick={props.onEditProfileClick}
            ></button>
          </div>
          <p className="profile__subtitle">{currentUser.about}</p>
          <button
            className="profile__add-button"
            type="button"
            title="Добавить фотографию"
            aria-label="Добавить фотографию"
            onClick={props.onAddPlaceClick}
          ></button>
        </div>
      </section>
      <section className="cards">
        <ul className="elements">
          {props.cards.map((item, i) => {
            return (
              <Card
                key={item._id}
                card={item}
                onCardClick={props.onCardClick}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}
