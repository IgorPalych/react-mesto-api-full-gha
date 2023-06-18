import React, { useState } from "react";
import { Link } from 'react-router-dom';

function Register({ registerUser, errorMessage }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setErrors({
      ...errors,
      [name]: evt.target.validationMessage
    });

    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    registerUser(formValue);
  }

  return (
    <main className="main">
      <section className="auth page__content">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title form__title_type_auth">Регистрация</h2>
          <p className="auth__error">{errorMessage}</p>
          <fieldset className="form__fieldset form__fieldset_type_auth">
            <div className="form__field">
              <input
                className="form__input form__input_type_auth"
                type="email"
                id="email"
                name="email"
                value={formValue.email}
                onChange={handleChange}
                placeholder="Email"
                required
                minLength="3"
                autoComplete="off" />
              <span className="form__error">{errors.email}</span>
            </div>
            <div className="form__field">
              <input
                className="form__input form__input_type_auth"
                type="password"
                id="password"
                name="password"
                value={formValue.password}
                onChange={handleChange}
                placeholder="Пароль"
                required
                minLength="6"
                autoComplete="off" />
              <span className="form__error">{errors.password}</span>
            </div>
          </fieldset>
          <button className="button form__submit form__submit_type_auth" type="submit">Зарегистрироваться</button>
        </form>
        <span className="auth__invite-to-login">Уже зарегистрированы?&nbsp;&nbsp;<Link className="link auth__link" to="/sign-in">Войти</Link></span>
      </section>
    </main>
  )
}

export default Register;