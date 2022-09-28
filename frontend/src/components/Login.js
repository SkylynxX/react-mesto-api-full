import React, { useState } from "react";

export function Login(props) {
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

    props.onSignIn({ password, email });
  }

  return (
    <section className="sign-up login">
      <h2 className="sign-up__title login__title">Вход</h2>
      <form
        className="sign-up__form login__form"
        name="signin"
        onSubmit={handleSubmit}
      >
        <input
          className="sign-up__email login__email personal"
          id="input-email"
          type="email"
          required
          name="email"
          value={email}
          onChange={handleChangeEmail}
          placeholder="Email"
        />
        <input
          className="sign-up__password login__password"
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
        <button className="sign-up__button login__button" type="submit">Войти</button>
      </form>
    </section>
  );
}
