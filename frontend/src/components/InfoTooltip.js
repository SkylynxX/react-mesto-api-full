import React from 'react';
import yes_pic from "../images/yes.svg";
import no_pic from "../images/no.svg";
export function InfoTooltip(props) {
  return (
    <div className={`popup-info popup  ${props.isOpen && "popup_opened"}`}>
      <div className="popup-info__container popup__container">
        <button
          className={`popup__close`}
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img className="popup-info__img" src={props.isSuccess ? yes_pic : no_pic} alt={props.isSuccess ? "Успешно выполнено" : "Возникла ошибка"}  />
        <h2 className="popup-info__title">{props.isSuccess ? " Вы успешно зарегистрировались!" : "Возникла ошибка, пожалуйтса, повторите попытку или свяжитесь с администратором сайта."}</h2>
      </div>
    </div>
  );
}
