import { optionsApi } from "../utils/constants.js";

class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {headers: this._headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
            .then(res => {
                this._id = res._id;
                return res;
            })

            .catch(err => {
                console.log(err);
            })
    }

    getInitialCards() {
        return fetch("https://nomoreparties.co/v1/cohort-66/cards", {headers: this._headers})
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })
            

            .catch(err => {
                console.log(err);
            })
    }

    setUserInfo(name, about) {
        return fetch("https://nomoreparties.co/v1/cohort-66/users/me", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }


    addNewCard(name, link) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-66/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }

    deleteCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}`, {
            method: "DELETE",
            headers: this._headers,
        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }

    likeCard(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: "PUT",
            headers: this._headers,
        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }

    likeCardDelete(cardId) {
        return fetch(`https://mesto.nomoreparties.co/v1/cohort-66/cards/${cardId}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })

            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }

    setAvatar(src) {
        return fetch("https://mesto.nomoreparties.co/v1/cohort-66/users/me/avatar", {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar: src,
            })
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }

                return Promise.reject(`Ошибка: ${res.status}`)
            })

            .catch(err => {
                console.log(err);
            })
    }

    
    getUserId() {
        return this._id;
    }
}



export const api = new Api(optionsApi);