import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from './Header';

function Login({ onLoginSubmit }) {
    const [formValue, setFormValue] = useState({
        email: '',
        password: '',
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValue({
            ...formValue,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onLoginSubmit(formValue.email, formValue.password);
    }

    console.log('AT LOGIN PAGE')

    return (
        <div className='page'>
            <Header>
                <Link to={'/sign-up'} className='header__enter-button'>Регистрация</Link>
            </Header>

            <div className='popup__container-auth'>
                <h2 className='popup__title_auth'>Вход</h2>
                <form className='popup__form'
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
                        value={formValue.email || ''}
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
                        value={formValue.password || ''}
                        onChange={(evt) => handleChange(evt)}
                    />

                    <button className='popup__submit-btn popup__submit-btn_auth popup-btn_type_auth' type='submit'>
                        Войти
                    </button>

                </form>
            </div>
        </div>

    );
}
export default Login;