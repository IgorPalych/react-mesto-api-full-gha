import React, { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main({ cards, onEditAvatar, onEditProfile, onAddPlace, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="user-panel page__content">
        <div className="user-panel__profile">
          <div className="avatar">
            <img className="image avatar__image" src={currentUser.avatar} alt="Аватар пользователя." />
            <button className="button avatar__edit" type="button" onClick={onEditAvatar}></button>
          </div>
          <div className="user-info">
            <h1 className="user-info__name">{currentUser.name}</h1>
            <span className="user-info__about">{currentUser.about}</span>
            <button className="button user-info__edit" type="button" onClick={onEditProfile}></button>
          </div>
        </div>
        <button className="button user-panel__add-place" type="button" onClick={onAddPlace}></button>
      </section>
      <section className="gallery page__content">
        <ul className="gallery__card-list">
          {
            cards.map((card) => (
              <Card
                key={card._id}
                card={card}
                onCardClick={onCardClick}
                onCardLike={onCardLike}
                onCardDelete={onCardDelete}
              />
            ))
          }
        </ul>
      </section>
    </main>
  );
}

export default Main;