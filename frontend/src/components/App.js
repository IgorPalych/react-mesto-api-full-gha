import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js';

import Header from './Header.js';
import Main from './Main.js';
import Register from './Register.js';
import Login from './Login.js';
import Footer from './Footer.js';

import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

import EditAvatarPopup from './EditAvatarPopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ImagePopup from './ImagePopup.js';
import InfoTooltip from './InfoTooltip.js';

import * as auth from '../utils/auth.js';
import api from '../utils/api';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({
    _id: "",
    email: ""
  });

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isAuthSuccess, setIsAuthSuccess] = useState(true);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState({});

  const [isLoad, setIsLoad] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    setToken(jwt);
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }
    auth
      .getUserData(token)
      .then((res) => {
        navigate("/");
        setIsLoggedIn(true);
        setUserData(res.data);
      })
      .catch((err) => { console.log(err) })
  }, [token, navigate]);

  useEffect(() => {
    if (isLoggedIn === true) {
      api.getUserInfo()
        .then(data => {
          setCurrentUser(data);
        })
        .catch(err => { console.log(err) });

      api.getCardList()
        .then(data => {
          setCards(data);
        })
        .catch(err => { console.log(err) });
    }
  }, [isLoggedIn]);

  function registerUser({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setIsInfoTooltipOpen(true);
        setToken(res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipOpen(true);
      })
  }

  function loginUser({ email, password }) {
    auth
      .authorize(email, password)
      .then((res) => {
        localStorage.setItem('token', res.token);
        setToken(res.token);
      })
      .catch((err) => {
        console.log(err);
        setIsAuthSuccess(false);
        setIsInfoTooltipOpen(true);
      });
  }

  function setTooltipContent() {
    const tooltipContent = {};
    tooltipContent.icon = isAuthSuccess ? "tooltip__icon_type_ok" : "tooltip__icon_type_fail";
    tooltipContent.message = isAuthSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте еще раз";
    return tooltipContent;
  }

  function logOut() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setToken("")
    setUserData({
      username: "",
      email: ""
    });
    navigate("/sign-in");
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(newAvatar => {
        setCurrentUser(newAvatar);
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
      .finally(() => setIsLoad(false));
    setIsLoad(true);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data)
      .then(newUserInfo => {
        setCurrentUser(newUserInfo);
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
      .finally(() => setIsLoad(false));
    setIsLoad(true);
  }

  function handleAddPlaceSubmit(data) {
    api.addPlace(data)
      .then(newCard => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch(err => { console.log(err) })
      .finally(() => setIsLoad(false));
    setIsLoad(true);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => { console.log(err) });
  }

  function handleCardDelete(card) {
    api.deletePlace(card._id)
      .then((newCard) => {
        const newCards = cards.filter((c) => c._id === card._id ? "" : newCard);
        setCards(newCards);
      })
      .catch(err => { console.log(err) });
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoTooltipOpen(false);
    setSelectedCard({});
  }


  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          userData={userData}
          logOut={logOut}
        />
        <Routes>
          <Route path="/sign-up" element={
            <Register
              registerUser={registerUser}
            />}
          />
          <Route path="/sign-in" element={
            <Login
              loginUser={loginUser}
            />}
          />
          <Route path="/" element={
            <ProtectedRoute
              component={Main}
              cards={cards}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              isLoggedIn={isLoggedIn}
            />
          }
          />
          <Route path="/*" element={isLoggedIn ? <Navigate to="/" replace /> : <Navigate to="/sign-in" replace />} />
        </Routes>

        <Footer />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
          isLoad={isLoad}
        />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoad={isLoad}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
          isLoad={isLoad}
        />

        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          setTooltipContent={setTooltipContent}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
