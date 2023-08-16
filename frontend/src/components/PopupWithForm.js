import React from "react";

export default function PopupWithForm(props) {

  return (
    <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button
          type="button"
          className="popup__close-btn"
          onClick={props.onClose}
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          className={`popup__form popup__form_${props.name}`}
          name={props.name}
          onSubmit={props.handleSubmit}
        >
          {props.children}
          <button
            type="submit"
            className="popup__submit-btn"
            aria-label="кнопка сохранить"
          >
            {props.btnText}
          </button>
        </form>
      </div>
    </section>
  )
}