import React from 'react';
export function PopupWithForm(props) {
  return (
    <div
      className={`popup popup-${props.name} ${props.isOpen && "popup_opened"}`}
    >
      <div className={`popup__container popup-${props.name}__container`}>
        <button
          className={`popup__close popup-${props.name}__close`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <h2 className={`popup__title popup-${props.name}__title`}>
          {props.title}
        </h2>
        <form
          className={`popup__form popup-${props.name}__form`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}
          <button
            className={`popup__save popup-${props.name}__save`}
            type="submit"
            aria-label={`${props.buttonText}`}
            value={`${props.buttonText}`}
          >
            {props.buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}
export default PopupWithForm;
