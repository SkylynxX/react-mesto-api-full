export class Auth {
  constructor(inObj) {
    this._baseUrl = inObj.baseUrl;
    this._headers = inObj.headers;
  }

  //Общая обработка результата запроса: ok - возвращаем сериализованный ответ, not ok - возвращаем промис со статусом  (аргумент - объект Response возвращемый промисом fetch)
  _returnStatus(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  }

  // Зарегистрировать пользователя с помощью пароля и имейла, успешный ответ _id email
  signUp(userData) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then(this._returnStatus);
  }

  // Залогинить пользователя с указанным паролем и емайлом, успешный ответ _id email
  signIn(userData) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        password: userData.password,
        email: userData.email,
      }),
    }).then(this._returnStatus);
  }

  // Проверить валидность токена и получить email
  validateToken(jwt) {
    if(jwt){
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": this._headers["Content-Type"],
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._returnStatus);
  }
  }
}

//экземпляр класса для экпорта
const auth = new Auth({
  baseUrl: "https://Mesto-api.SkylynxX.nomoredomains.icu",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
