import { optionsApi } from "../utils/constants.js";

class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo() {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  getInitialCards() {
    return fetch("https://nomoreparties.co/v1/cohort-66/cards", {
      headers: this._headers,
    }).then((res) => this._getResponseData(res));
  }

  setUserInfo(name, about) {
    return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then((res) => this._getResponseData(res));
  }

  addNewCard(name, link) {
    return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => this._getResponseData(res));
  }

  deleteCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => this._getResponseData(res));
  }

  likeCard(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
      }
    ).then((res) => this._getResponseData(res));
  }

  likeCardDelete(cardId) {
    return fetch(
      `https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
      }
    ).then((res) => this._getResponseData(res));
  }

  setAvatar(src) {
    return fetch(
      "https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar",
      {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
          avatar: src,
        }),
      }
    ).then((res) => this._getResponseData(res));
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
}

export const api = new Api(optionsApi);
