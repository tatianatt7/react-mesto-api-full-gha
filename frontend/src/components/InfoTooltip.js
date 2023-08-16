import React from 'react';
import FailPic from '../images/FailPic.svg';
import DonePic from '../images/DonePic.svg';

export default function InfoTooltip({ isOpen, onClose, isSuccess }) {

    return (
        <section className={`popup ${isOpen ? 'popup_opened' : ''}`}
        >
            <div className={'popup__container popup__container-tooltip'}>
                <button className='popup__close-btn'
                    type='button'
                    area-label='кнопка закрыть модальное окно'
                    onClick={onClose}
                />
                <img className='popup__infotooltip-image'
                    src={isSuccess ? DonePic : FailPic}
                    alt=''
                />
                <p className='popup__infotooltip-title'>
                    {isSuccess ? 'Вы успешно зарегестрировались!' : 'Что-то пошло не так! попробуйте ещё раз.'}
                </p>
            </div>
        </section>
    );
}

