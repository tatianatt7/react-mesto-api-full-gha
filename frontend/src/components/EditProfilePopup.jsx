import React, { useState, useContext, useEffect } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, editProfileLoading }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);


  return (
    <PopupWithForm
      name={"edit-profile"}
      title="редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      btnText={`${editProfileLoading ? 'Сохранение...' : 'Сохранить'}`}
      handleSubmit={handleSubmit}
    >
      <input
        required=""
        className="popup__input popup__input_value_user-name"
        type="text"
        placeholder="Ваше имя"
        name="user-name"
        minLength={2}
        maxLength={40}
        id="name-input"
        value={name || ''}
        onChange={(evt) => handleChangeName(evt)}
      />
      <span className="popup__error user-name-error" />
      <input
        required=""
        className="popup__input popup__input_value_job"
        type="text"
        placeholder="Род деятельности"
        name="job"
        minLength={2}
        maxLength={200}
        id="job-input"
        value={description || ''}
        onChange={(evt) => handleChangeDescription(evt)}
      />
      <span className="popup__error job-error" />
    </PopupWithForm>
  )
}

export default EditProfilePopup;