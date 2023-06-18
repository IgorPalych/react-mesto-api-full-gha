import React from "react";

function PopupWithForm({ children, isOpen, onClose, onSubmit, submitButtonText }) {
  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__form">
        <form className="form" onSubmit={onSubmit}>
          {children}
          <button className="button form__submit" type="submit">{submitButtonText}</button>
        </form>
        <button className="button popup__close" type="button" onClick={onClose}></button>
      </div>
    </div >
  )
}

export default PopupWithForm;
