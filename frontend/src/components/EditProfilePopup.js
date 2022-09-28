import React, { useState, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }
  return (
    <PopupWithForm
      name="profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup-profile__input-name"
        id="input-name"
        type="text"
        autoComplete="off"
        required
        name="name"
        minLength="2"
        maxLength="40"
        placeholder="Логин"
        value={name || ""}
        onChange={handleNameChange}
      />
      <p className="popup__input-error input-name-error"></p>
      <input
        className="popup__input popup-profile__input-info"
        id="input-description"
        type="text"
        autoComplete="off"
        required
        name="about"
        minLength="2"
        maxLength="200"
        placeholder="Информация о пользователе"
        value={description || ""}
        onChange={handleDescriptionChange}
      />
      <p className="popup__input-error input-description-error"></p>
    </PopupWithForm>
  );
}
