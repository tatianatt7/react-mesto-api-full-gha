import logo from '../images/logo.svg';
import { Link } from 'react-router-dom';

export default function Header({ currentUser, userEmail, onSignOut, children}) {
  return (
    <header className="header">
      <img src={logo} alt="лого Место" className="header__logo" />
      {currentUser ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <span>{userEmail}</span>
          <button onClick={onSignOut}>Выйти</button>
        </div>
      )
      :
      (
        <>
          {children}
        </>
      )}
    </header>
  )
}