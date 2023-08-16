import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

export default function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-container"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar}
              alt="аватар"
            />
          </button>
          <div className="profile__form">
            <div className="profile__info">
              <h1 className="profile__user-name">{currentUser.name}</h1>
              <button
                className="profile__edit-btn"
                onClick={onEditProfile}
                type="button"
              />
            </div>
            <p className="profile__job">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="profile__add-btn"
          onClick={onAddPlace}
          type="button"
        />
      </section>

      <section className="cards">
        <div className="cards__list">
          {
            cards.map((card) => (
              <Card key={card._id} card={card} onCardLike={onCardLike} onCardDelete={onCardDelete} onCardClick={onCardClick} />
            ))
          }
        </div>
      </section>
    </main>
  )
}