import { configApi } from "./constants.js";

class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getCardList() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

  setUserProfile(data) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        "name": data.name,
        "about": data.about
      })
    })
      .then(res => this._checkResponse(res));
  }

  setUserAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ "avatar": data.avatar })
    })
      .then(res => this._checkResponse(res));
  }

  addPlace({ name, link }) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        "name": name,
        "link": link
      })
    })
      .then(res => this._checkResponse(res));
  }

  deletePlace(id) {
    return fetch(`${this._url}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers,
    })
      .then(res => this._checkResponse(res));
  }

  changeLikeCardStatus(cardId, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: this._headers,
      })
        .then(res => this._checkResponse(res));
    } else {
      return fetch(`${this._url}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: this._headers,
      })
        .then(res => this._checkResponse(res));
    }
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(res => this._checkResponse(res));
  }

}

const api = new Api(configApi);

export default api;
