import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import logo from '../images/logo.svg';

function Header({ userData, logOut }) {
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);
  const toShowMenu = isShowMobileMenu ? "" : "mobile-menu_not-displayed";

  function handleBurgerToogle() {
    setIsShowMobileMenu(!isShowMobileMenu);
  }

  return (
    <>
      <section className={`mobile-menu ${toShowMenu}`}>
        <nav className="menu menu_type_mobile">
          <span className="menu__email">{userData.email}</span>
          <button className="button menu__logout" onClick={logOut}>Выйти</button>
        </nav>
      </section>
      <header className="header page__content">
        <Link className="logo" to="/">
          <img className="image" src={logo} alt="Логотип проекта Место." />
        </Link>
        <div>
          <Routes>
            <Route path="/" element={
              <>
                <nav className="menu menu_type_desktop">
                  <span className="menu__email">{userData.email}</span>
                  <button className="button menu__logout" onClick={logOut}>Выйти</button>
                </nav>
                <div className="burger">
                  <input id="burger__toggle" type="checkbox" onChange={handleBurgerToogle} />
                  <label className="burger__btn" htmlFor="burger__toggle">
                    <span></span>
                  </label>
                </div>
              </>
            } />
            <Route path="/sign-in" element={
              <nav className="menu">
                <Link className="link" to="/sign-up">Регистрация</Link>
              </nav>
            } />
            <Route path="/sign-up" element={
              <nav className="menu">
                <Link className="link" to="/sign-in">Вход</Link>
              </nav>
            } />
          </Routes>
        </div>

      </header >
    </>
  );
}

export default Header;