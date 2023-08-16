import React, { useState, useEffect, useRef } from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ onUpdateAvatar, isOpen, onClose, editAvatarLoading }) {
  const [avatar, setAvatar] = useState('');
  const avatarRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setAvatar('');
    }
  }, [isOpen]);

  function handleChange(event) {
    setAvatar(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }


  return (
    <PopupWithForm
      name="change-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      btnText={`${editAvatarLoading ? 'Сохранение...' : 'Сохранить'}`}
      handleSubmit={(evt) => handleSubmit(evt)}
    >
      <input
        required=""
        className="popup__input popup__input_value_avatar-link"
        type="url"
        placeholder="Ссылка на картинку"
        value={avatar}
        name="avatar-link"
        id="avatar-link"
        onChange={handleChange}
        ref={avatarRef}
      />
      <span className="popup__error avatar-link-error" />
    </PopupWithForm>
  )
}


export default EditAvatarPopup;