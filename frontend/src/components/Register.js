import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


function Register({onRegistrationSubmit}) {
    const [formValue, setformValue] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setformValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegistrationSubmit(formValue.email, formValue.password);
    }

    return (
        <div className='page'>
            <Header>
                <Link to={'/sign-in'} className="header__enter-button">Войти</Link>
            </Header>

            <div className='popup__container-auth'>
                <h2 className='popup__title_auth'>Регистрация</h2>
                <form className={'popup__form'}
                    onSubmit={handleSubmit}
                    noValidate=''
                >

                    <input required=''
                        className='popup__input popup__input_auth popup__input_value_email'
                        placeholder='Email'
                        type='email'
                        name='email'
                        id='user-name-input'
                        minLength={8}
                        maxLength={40}
                        value={formValue.email}
                        onChange={(evt) => handleChange(evt)}
                    />

                    <input
                        required=""
                        className="popup__input popup__input_auth popup__input_value_password"
                        placeholder='Пароль'
                        type='password'
                        name='password'
                        minLength={8}
                        maxLength={40}
                        id="password-input"
                        value={formValue.password}
                        onChange={(evt) => handleChange(evt)}
                    />

                    <button className='popup__submit-btn popup__submit-btn_auth popup-btn_type_auth' type='submit'>
                        Зарегистрироваться
                    </button>

                </form >

                <p className='popup__subtitle'>
                    <span>Уже зарегестрированы?</span>
                    <Link to={'/sign-in'} className="popup__link" href='#'>Войти</Link>
                </p>
            </div >
        </div>
    );
}

export default Register;