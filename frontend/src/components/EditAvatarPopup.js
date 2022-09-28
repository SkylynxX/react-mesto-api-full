import React, { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export function EditAvatarPopup(props) {
  const avatarRef = useRef();

  useEffect(() => {
    avatarRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  return (
    <PopupWithForm
      name="avatar-update"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup-avatar-update__input-link"
        id="popup-avatar-update-url"
        type="url"
        autoComplete="off"
        required
        name="avatar"
        placeholder="Ссылка на картинку"
        ref={avatarRef}
      />
      <p className="popup__input-error popup-avatar-update-url-error"></p>
    </PopupWithForm>
  );
}
