import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some(item => item === currentUser._id);
  const cardLikeButtonClassName = (
    `button card__like ${isLiked && 'card__like_active'}`
  );

  function handleCardClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="card">
      <img className="image card__image" src={card.link} alt={card.name} onClick={handleCardClick} />
      <div className="card__description">
        <h3 className="card__title">{card.name}</h3>
        <div className="card__like-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <span className="card__like-counter">{card.likes.length}</span>
        </div>
      </div>
      {
        isOwn && <button className="button card__delete" type="button" onClick={handleDeleteClick}></button>
      }
    </li>
  );
}

export default Card;