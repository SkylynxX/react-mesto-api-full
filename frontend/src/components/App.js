import { useEffect, useState } from "react";
import "../index.css";
import { ProtectedRoute } from "./ProtectedRoute";
import { useHistory, Switch, Route, Redirect } from "react-router-dom";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Main } from "./Main";
import { Login } from "./Login";
import { Register } from "./Register";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
import { ImagePopup } from "./ImagePopup";
import { InfoTooltip } from "./InfoTooltip";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import avatar from "./../images/avatar-image.jpg";
import api from "../utils/api";
import auth from "../utils/auth";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({
    name: "Жак-Ив Кусто",
    about: "Исследователь океана",
    avatar: avatar,
  });
  const [cards, setCards] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const history = useHistory();
  const [isRequestSuccess, setRequestSuccess] = useState(false);

  useEffect(() => {
    //валидируем токен через API авторизации
    const userToken = localStorage.getItem("jwt");
    if (userToken) {
      auth
        .validateToken(userToken)
        .then((userData) => {
          if (userData) {
            // console.log(userData)
            setUserEmail(userData.data.email);
            setLoggedIn(true);
            history.push("/");
          }
        })
        .catch((err) => {
          //попадаем сюда если один из промисов завершится ошибкой
          console.log(err);
        });
    }
  }, [history]);

  useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([rxUserInfo, initialCards]) => {
        //попадаем сюда, когда оба промиса будут выполнены, деструктурируем ответ
        setCurrentUser(rxUserInfo); //все данные получены, отрисовываем страницу
        setCards(initialCards);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершится ошибкой
        console.log(err);
      });
  }, []);

  function redirectToSignIn() {
    closeAllPopups();
    history.push("/sign-in");
  }
  function handleSignUp(userData) {
    // console.log(userData);
    auth
      .signUp(userData)
      .then((userData) => {
        //В случае успешной регистрации показываем окно успеха
        setInfoTooltipOpen(true);
        setRequestSuccess(true);
        //Ждем 2 секунды чтобы дать понять человеку что в окне галочка,
        //делаем редирект для возможности пользователю войти
        setTimeout(redirectToSignIn, 2000);
      })
      .catch((err) => {
        //В случае не успешной регистрации показываем окно не успеха
        setInfoTooltipOpen(true);
        setRequestSuccess(false);
        console.log(err);
      });
  }

  function handleSignIn(userData) {
    // console.log(userData);
    auth
      .signIn(userData)
      .then((userReceivedData) => {
        // console.log(userReceivedData);
        //В случае успешной авторизации
        localStorage.setItem("jwt", userReceivedData.token);
        setUserEmail(userData.email);
        setLoggedIn(true);
        history.push("/");
      })
      .catch((err) => {
        //В случае не успешной авторизации показываем окно не успеха
        setInfoTooltipOpen(true);
        setRequestSuccess(false);
        console.log(err);
      });
  }

  function handleSignOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setUserEmail("");
  }

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleCardDelete(card) {
    //console.log('delete card enter');
    api
      .removeCard(card._id)
      .then(() => {
        setCards((state) => state.filter((item) => item !== card));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }
  function handleCardClick(card) {
    setSelectedCard(card);
  }
  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }
  function handleUpdateUser(userInfoData) {
    api
      .setUserInfo(userInfoData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleUpdateAvatar(userInfoData) {
    api
      .setUserAvatar(userInfoData)
      .then((userInfo) => {
        setCurrentUser(userInfo);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/signin">
            <Header
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              linkPath={"/signup"}
              linkText="Регистрация"
            />
            <Login onSignIn={handleSignIn} />
          </Route>
          <Route path="/signup">
            <Header
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              linkPath={"/signin"}
              linkText="Войти"
            />
            <Register onSignUp={handleSignUp} />
          </Route>
          <Route path="/">
            <Header
              isLoggedIn={isLoggedIn}
              userEmail={userEmail}
              onClick={handleSignOut}
              linkPath={"/"}
              linkText="Выйти"
            />
            <ProtectedRoute
              exact
              path="/"
              cards={cards}
              component={Main}
              isLoggedIn={isLoggedIn}
              onEditAvatarClick={handleEditAvatarClick}
              onEditProfileClick={handleEditProfileClick}
              onAddPlaceClick={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
            />
          </Route>
          <Route exact path="*">
            {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        <Footer />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />
        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlaceSubmit={handleAddPlaceSubmit}
        />
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isSuccess={isRequestSuccess}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
