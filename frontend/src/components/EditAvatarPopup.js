import React, { useEffect, useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoad }) {
  const avatarRef = useRef();
  const submitButtonText = isLoad ? "Сохранение..." : "Сохранить";

  useEffect(() => {
    avatarRef.current.value = "";
  }, [isOpen]);

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText={submitButtonText}>
      <h2 className="form__title">Обновить аватар</h2>
      <fieldset className="form__fieldset">
        <div className="form__field">
          <input id="avatar-input" name="avatar" ref={avatarRef} className="form__input form__input_el_place-image" type="url"
            placeholder="Ссылка на картинку" required autoComplete="off" />
          <span className="form__error avatar-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;