import Header from '../components/Header';
import Main from '../components/Main';
import Footer from '../components/Footer';
import EditAvatarPopup from '../components/EditAvatarPopup';
import AddPlacePopup from '../components/AddPlacePopup';
import ImagePopup from '../components/ImagePopup';
import EditProfilePopup from '../components/EditProfilePopup';

function MainPage(props) {

    const {
        onSignOut,
        userEmail,
        cards,
        currentUser,
        closeAllPopups,
        isEditProfilePopupOpen,
        isEditAvatarPopupOpen,
        isImagePopupOpen,
        isAddPlacePopupOpen,
        selectedCard,
        handleAddPlaceClick,
        handleAddPlaceSubmit,
        handleCardClick,
        handleCardDelete,
        handleCardLike,
        handleEditAvatarClick,
        handleEditProfileClick,
        handleUpdateAvatar,
        handleUpdateUser,
        isPopupLoading
    } = props;

    return (
        <div className="page">

            <Header currentUser={currentUser} userEmail={userEmail} onSignOut={onSignOut} />

            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardDelete={handleCardDelete}
                onCardLike={handleCardLike}
                cards={cards}
            />

            <Footer />

            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                editProfileLoading={isPopupLoading}
            />

            {/*попап смена аватара*/}
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                editAvatarLoading={isPopupLoading}
            />

            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddPlaceSubmit}
                addPlaceLoading={isPopupLoading}
            />

            {/*попап zoom*/}
            <ImagePopup card={selectedCard}
                onClose={closeAllPopups}
                isOpen={isImagePopupOpen}>
            </ImagePopup>

            {/*попап submit*/}
            <div className="popup popup_type_submit">
                <div className="popup__container">
                    <button type="button" className="popup__close-btn" />
                    <h2 className="popup__title">Вы уверены?</h2>
                    <button type="submit" className="popup__submit-btn" aria-label="кнопка сохранить">Да</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage;