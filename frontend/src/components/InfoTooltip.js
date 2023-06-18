import React from "react";

function InfoTooltip({ isOpen, onClose, setTooltipContent }) {
  const { icon, message } = setTooltipContent();

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__tooltip">
        <div className="tooltip">
          <div className={`tooltip__icon ${icon}`}></div>
          <span className="tooltip__text">
            {
              message
            }
          </span>
        </div>
        <button className="button popup__close" type="button" onClick={onClose}></button>
      </div >
    </div >
  );
}

export default InfoTooltip;