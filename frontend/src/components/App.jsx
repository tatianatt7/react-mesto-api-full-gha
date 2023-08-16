import '../index.css';
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from "../utils/Api";
import { CurrentUserContext } from "../context/CurrentUserContext";
import Login from './Login.js';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import authApi from '../utils/AuthApi';
import MainPage from '../components/MainPage';
import { deleteTokenFromLs, getTokenFromLs, saveTokenToLs } from '../utils/LocalStorageToken';

function App() {

  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [userEmail, setUserEmail] = useState('');

  const [isPopupLoading, setIsPopupLoading] = useState(false);

  const [isSuccessPopupOpened, setIsSuccessPopupOpened] = useState(false);
  const [isFailPopupOpened, setIsFailPopupOpened] = useState(false);

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setSelectedCard(null);
    setIsFailPopupOpened(false);
    setIsSuccessPopupOpened(false);
  }

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  //AUTH

  useEffect(() => {
    if (!loggedIn && getTokenFromLs()) {
      authApi.checkUser()
        .then(res => {
          setLoggedIn(true);
          setUserEmail(res.email);
          navigate('/');
        })
        .catch(err => {
          setIsFailPopupOpened(true);
        })
    }
  });

  useEffect(() => {
    if (loggedIn) {
      api(getTokenFromLs()).getUserInfo()
        .then((userData) => {
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.log(err)
        }
        );

      api(getTokenFromLs())
        .getInitialCards()
        .then((res) => {
          setCards(res);
        })
        .catch(err =>
          console.log(err));
    }
  }, [loggedIn]);

  const handleCardLike = (card) => {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api(getTokenFromLs()).changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
      setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleCardDelete = (card) => {
    api(getTokenFromLs()).deleteCard(card._id)
      .then(() => {
        setCards(cards.filter((newCard) => newCard._id !== card._id));
      })
      .catch((err) => {
        console.log(err)
      });


  };

  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);

  const handleUpdateUser = ({ name, about }) => {
    setIsPopupLoading(true);
    api(getTokenFromLs()).setUserInfo(name, about)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPopupLoading(false));
  };

  const handleUpdateAvatar = ({ avatar }) => {
    setIsPopupLoading(true);
    api(getTokenFromLs()).editAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPopupLoading(false));
  };

  const handleAddPlaceSubmit = ({ name, link }) => {
    setIsPopupLoading(true);
    api(getTokenFromLs()).addCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => setIsPopupLoading(false));
  };

  const onLoginSubmit = (email, password) => {
    authApi.loginUser(email, password)
      .then(res => {
        saveTokenToLs(res.token);
        setUserEmail(email);
        setLoggedIn(true);
        navigate('/');
      })
      .catch(err => {
        setIsFailPopupOpened(true);
      })
  }

  const onRegistrationSubmit = (email, password) => {
    authApi.registerUser(email, password)
      .then(res => {
        setIsSuccessPopupOpened(true);
      })
      .catch(err => {
        setIsFailPopupOpened(true);
      })
  }

  const onSignOut = () => {
    setUserEmail('');
    setLoggedIn(false);
    deleteTokenFromLs();
  }

  console.log('AT MAIN PAGE');

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Routes>
        <Route path='/' element={
          <ProtectedRoute
            element={MainPage}
            loggedIn={loggedIn}
            onSignOut={onSignOut}
            userEmail={userEmail}
            cards={cards}
            currentUser={currentUser}
            isEditProfilePopupOpen={isEditProfilePopupOpen}
            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
            isImagePopupOpen={isImagePopupOpen}
            isAddPlacePopupOpen={isAddPlacePopupOpen}
            selectedCard={selectedCard}
            isPopupLoading={isPopupLoading}
            closeAllPopups={closeAllPopups}
            handleAddPlaceClick={handleAddPlaceClick}
            handleAddPlaceSubmit={handleAddPlaceSubmit}
            handleCardClick={handleCardClick}
            handleCardDelete={handleCardDelete}
            handleCardLike={handleCardLike}
            handleEditAvatarClick={handleEditAvatarClick}
            handleEditProfileClick={handleEditProfileClick}
            handleUpdateAvatar={handleUpdateAvatar}
            handleUpdateUser={handleUpdateUser}
          />
        }
        />
        <Route path='/sign-in'
          element={
            <Login onLoginSubmit={onLoginSubmit} />
          } />

        <Route path='/sign-up'
          element={
            <Register onRegistrationSubmit={onRegistrationSubmit} />
          }
        />
      </Routes>

      <InfoTooltip isOpen={isSuccessPopupOpened} isSuccess={true} onClose={closeAllPopups} />
      <InfoTooltip isOpen={isFailPopupOpened} isSuccess={false} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
