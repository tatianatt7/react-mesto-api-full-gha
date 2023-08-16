export default function ImagePopup({ card, onClose, isOpen }) {

  return (
    <div className={`popup popup_type_zoom ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__zoom-container">
        <button type="button" className="popup__close-btn" onClick={onClose} />
        <img className="popup__zoom-image" src={card?.link} alt={card?.name} />
        <p className="popup__card-title">{card?.name}</p>
      </div>
    </div>
  )
}