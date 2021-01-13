export default class ApiReg {
    constructor(option) {
        this.headers = option.headers;
        this.baseUrl = option.baseUrl;
    }

    _fetch(url, opt={}) {      
        return fetch(this.baseUrl+url,{headers: this.headers, ...opt})
        .then((res) => {
            try {
                if (res.ok) {
                    return res.json();
                }
            } 
            catch(error) {
                return (error)
            }
          return Promise.reject(`Хьюстон, у нас проблемы: ${res.status}`);
        })
        .then((res) => {
            return res;
        })
      }

    signup(password, email) {
        return this._fetch(`/signup`, {
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'},
            body: JSON.stringify({
                password,
                email
            })
        })
    }

    signin(password, email) {
        return this._fetch(`/signin`, {   //!!!!!!!!!! What is FETCH???
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json'},
            body: JSON.stringify({
                email,
                password
            })
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem('token', data.token);
                return data;   
            } else {
                return
            }
            
        })
    }

    usersme(token) {
        return this._fetch(`/users/me`, {
            method: 'GET',
            headers: {
              'Content-Type' : 'application/json',
              "Authorization" : `Bearer ${token}`
            }
        })
    } 

}

export const apireg = new ApiReg ({
    baseUrl: 'https://auth.nomoreparties.co',
})