import React, { useState, useEffect, useContext } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoad }) {
  const currentUser = useContext(CurrentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const submitButtonText = isLoad ? "Сохранение..." : "Сохранить";

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
  }, [currentUser, isOpen]);

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function handleAboutChange(event) {
    setAbout(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} submitButtonText={submitButtonText}>
      <h2 className="form__title">Редактировать профиль</h2>
      <fieldset className="form__fieldset">
        <div className="form__field">
          <input id="name-input" name="name" className="form__input" type="text" value={name || ""} onChange={handleNameChange} placeholder="Имя" required minLength="2"
            maxLength="40" autoComplete="off" />
          <span className="form__error name-input-error"></span>
        </div>
        <div className="form__field">
          <input id="about-input" name="about" className="form__input" type="text" value={about || ""} onChange={handleAboutChange} placeholder="Вид деятельности" required
            minLength="2" maxLength="200" autoComplete="off" />
          <span className="form__error about-input-error"></span>
        </div>
      </fieldset>
    </PopupWithForm>
  );
}

export default EditProfilePopup;