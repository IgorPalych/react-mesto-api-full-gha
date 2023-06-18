import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup ${card.name ? 'popup_opened' : ''}`}>
      <div className="popup__figure">
        <figure className="figure">
          <img className="image figure__image" src={card.link} alt={card.name} />
          <figcaption className="figure__caption">{card.name}</figcaption>
        </figure>
        <button className="button popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;