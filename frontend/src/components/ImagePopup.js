export function ImagePopup(props) {
  return (
    <div
      className={`popup popup-image ${
        Object.keys(props.card).length && "popup_opened"
      }`}
    >
      <div className="popup-image__container">
        <button
          className="popup-image__close popup__close"
          type="button"
          title="Закрыть окно"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        ></button>
        <img
          className="popup-image__img"
          src={`${props.card.link}`}
          alt={`${props.card.name}`}
        />
        <p className="popup-image__text">{props.card.name}</p>
      </div>
    </div>
  );
}
