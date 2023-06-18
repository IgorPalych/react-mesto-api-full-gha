import React, { useState } from 'react';

function Login({ loginUser, errorMessage }) {
  const [formValue, setFormValue] = useState({
    email: '',
    password: ''
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormValue({
      ...formValue,
      [name]: value
    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    loginUser(formValue);
  }

  return (
    <main className="main">
      <section className="auth page__content">
        <form className="form" onSubmit={handleSubmit}>
          <h2 className="form__title form__title_type_auth">Вход</h2>
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
                autoComplete="off"
              />
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
                autoComplete="off" />
            </div>
          </fieldset>
          <button className="button form__submit form__submit_type_auth" type="submit">Войти</button>
        </form>
      </section>
    </main>
  )
}

export default Login;