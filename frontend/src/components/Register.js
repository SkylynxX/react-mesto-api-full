import React, { useState } from "react";
import { Link } from 'react-router-dom';

export function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    props.onSignUp({ password, email });
  }

  return (
    <section className="sign-up register">
      <h2 className="sign-up__title register__title">Регистрация</h2>
      <form
        className="sign-up__form register__form"
        name="signup"
        onSubmit={handleSubmit}
      >
        <input
          className="sign-up__email register__email"
          id="input-email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="sign-up__password register__password"
          id="input-password"
          type="password"
          required
          name="password"
          minLength="3"
          maxLength="40"
          value={password}
          onChange={handleChangePassword}
          placeholder="Пароль"
        />
        <button className="sign-up__button register__button" type="submit">
          Зарегистрироваться
        </button>
        <Link className="sign-up__question register__question" to="signin">
          Уже зарегистрированы? Войти
        </Link>
      </form>
    </section>
  );
}
