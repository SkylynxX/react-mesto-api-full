import React, { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  useEffect(() => {
    if (props.isOpen) {
      setName("");
      setLink("");
    }
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onAddPlaceSubmit({
      name,
      link,
    });
  }
  return (
    <PopupWithForm
      name="new-item"
      title="Новое место"
      buttonText="Создать"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup-new-item__input-name"
        id="input-item-name"
        type="text"
        autoComplete="off"
        required
        name="name"
        minLength="2"
        maxLength="30"
        placeholder="Название"
        value={name}
        onChange={handleNameChange}
      />
      <p className="popup__input-error input-item-name-error"></p>
      <input
        className="popup__input popup-new-item__input-link"
        id="input-item-url"
        type="url"
        autoComplete="off"
        required
        name="link"
        placeholder="Ссылка на картинку"
        value={link}
        onChange={handleLinkChange}
      />
      <p className="popup__input-error input-item-url-error"></p>
    </PopupWithForm>
  );
}
