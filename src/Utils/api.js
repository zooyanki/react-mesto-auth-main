export default class Api {
    constructor(options) {
      this.headers = options.headers;
      this.baseUrl = options.baseUrl;
    }

    _fetch(url, opt={}) {      
      return fetch(this.baseUrl+url,{headers: this.headers, ...opt})
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Хьюстон, у нас проблемы: ${res.status}`);
      })
    }
  
    getInitialCards() {
      return this._fetch(`/cards`);
    }

    getUserInfo() {
      return this._fetch(`/users/me`);
    }

    setUserInfo(name, about) {
      return this._fetch(`/users/me`, {
        method: `PATCH`,
        body: JSON.stringify({
          name: name,
          about: about,
        })
      });
    }

    setUserAvatar(avatar) {
      return this._fetch(`/users/me/avatar`, {
        method: `PATCH`,
        body: JSON.stringify({
          avatar: avatar
        })
      });
    }

    setInitialCard(name, link) {
      return this._fetch(`/cards`, {
        method: `POST`,
        body: JSON.stringify({
          name: name,
          link: link
        })
      });
    }

    delInitialCards(del) {
      return this._fetch(`/cards/${del}`, {
        method: `DELETE`,
        body: JSON.stringify({
          _id: del 
        })
      });
    }

    addLikeCard(addlike) {
      return this._fetch(`/cards/likes/${addlike}`, {
        method: `PUT`,
        body: JSON.stringify({
          _id: addlike 
        })
      });
    }

    remLikeCard(remlike) {
      return this._fetch(`/cards/likes/${remlike}`, {
        method: `DELETE`,
        body: JSON.stringify({
          _id: remlike 
        })
      });
    }
}

export const api = new Api({ 
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16', 
  headers: { 
    authorization: '588c72f6-47fd-494a-9f61-2083e374b77d', 
    'Content-Type': 'application/json' 
  } 
});


  
