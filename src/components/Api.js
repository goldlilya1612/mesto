export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
                headers: this._headers
            })
            .then(this._checkResponse)
    }


    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
                headers: this._headers
            })
            .then(this._checkResponse)
    }

    editInfo(data) {
        return fetch(`${this._baseUrl}/users/me`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    about: data["about-myself"]
                })
            })
            .then(this._checkResponse)
    }

    addCard(data) {
        return fetch(`${this._baseUrl}/cards `, {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: data.name,
                    link: data.link
                })
            })
            .then(this._checkResponse)
    }

    removeCard(id) {
        return fetch(`${this._baseUrl}/cards/${id} `, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    addLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'PUT',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    removeLike(id) {
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
                method: 'DELETE',
                headers: this._headers,
            })
            .then(this._checkResponse)
    }

    updateAvatar(link) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: link,
                })
            })
            .then(this._checkResponse)
    }

    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка ${res.status}`);
    }

}