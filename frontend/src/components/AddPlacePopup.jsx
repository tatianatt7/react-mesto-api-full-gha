import React, { useState, useEffect } from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, addPlaceLoading }) {
    const [link, setLink] = useState('');
    const [name, setName] = useState('');
    const nameRef = useState('');

    function handleLinkChange(e) {
        setLink(e.target.value)
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    useEffect(() => {
        setLink('');
        setName('');

    }, [isOpen]);

    useEffect(() => {
        if (nameRef.current && isOpen) {
            nameRef.current.focus();
        }
    }, [isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onAddPlace({
            name: name,
            link: link
        });
    }

    return (
        <PopupWithForm
            name="add-card"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClose}
            btnText={`${addPlaceLoading ? 'Сохранение...' : 'Сохранить'}`}
            handleSubmit={handleSubmit}
        >
            <input
                required=""
                className="popup__input popup__input_value_card-name"
                type="text"
                placeholder="Название"
                name="card-name"
                minLength={2}
                maxLength={30}
                id="card-name"
                onChange={handleNameChange}
                value={name || ''}
            />
            <span className="popup__error card-name-error" />
            <input
                required=""
                className="popup__input popup__input_value_card-link"
                type="url"
                placeholder="Ссылка на картинку"
                name="card-link"
                id="card-link"
                onChange={handleLinkChange}
                value={link || ''}
            />
            <span className="popup__error card-link-error" />
        </PopupWithForm>
    )
}

export default AddPlacePopup;