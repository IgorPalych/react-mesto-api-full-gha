import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoad }) {
  const submitButtonText = isLoad ? "Сохранение..." : "Сохранить";

  const placeNameRef = useRef();
  const placeLinkRef = useRef();

  useEffect(() => {
    if (isOpen) {
      placeNameRef.current.value = "";
      placeLinkRef.current.value = "";
    }
  }, [isOpen])

  function handleSubmit(event) {
    event.preventDefault();
    onAddPlace({
      name: placeNameRef.current.value,
      link: placeLinkRef.current.value
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText={submitButtonText}>
      <h2 className="form__title">Новое место</h2>
      <fieldset className="form__fieldset">
        <div className="form__field">
          <input id="place-input" name="name" className="form__input" ref={placeNameRef} type="text" placeholder="Название" required
            minLength="2" maxLength="30" autoComplete="off" />
          <span className="form__error place-input-error"></span>
        </div>
        <div className="form__field">
          <input id="image-input" name="link" className="form__input" ref={placeLinkRef} type="url" placeholder="Ссылка на картинку" required
            autoComplete="off" />
          <span className="form__error image-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default AddPlacePopup;