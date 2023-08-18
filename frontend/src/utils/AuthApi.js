import { getTokenFromLs } from "./LocalStorageToken";

class AuthApi {
    constructor(config) {
        this._baseUrl = config.baseUrl;
    }
    //отправляем запрос к серверу
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    }

    //регистрация пользователя
    registerUser({email, password}) {
        return fetch(`${this._baseUrl}/signup`, {
            method: 'POST',
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify({ password, email })
        })
            .then((res) => this._checkResponse(res))
    }

    //логин юзера
    loginUser(email, password) {
        return fetch(`${this._baseUrl}/signin`, {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ password, email })
        })
            .then((res) => this._checkResponse(res))
    }

    //проверка юзера
    checkUser() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${getTokenFromLs()}`
            } ,
        })
            .then((res) => this._checkResponse(res))
    }
}

const authApi = new AuthApi({
    baseUrl: process.env.REACT_APP_API_URL,
})

export default authApi;