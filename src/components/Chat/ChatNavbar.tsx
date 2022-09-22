import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { useAuth } from '../../context/AuthContext';

import './ChatNavbar.scss';

export const ChatNavbar = () => {
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleSignOut = useCallback(() => {
    signOut(auth);
    navigate(0);
  }, [navigate]);

  return (
    <div className="chat-navbar">
      <span className="logo">Чат</span>
      <div className="chat-navbar__user-info">
        <img src={isAuth?.photoURL || ''} alt="" />
        <span>{isAuth?.displayName}</span>
        <button onClick={handleSignOut}>Выйти</button>
      </div>
    </div>
  )
}
