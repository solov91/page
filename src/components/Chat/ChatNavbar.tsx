import { useCallback } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { useAuth } from '../../context/AuthContext';

import './ChatNavbar.scss';
import { useNavigate } from 'react-router-dom';

export const ChatNavbar = () => {
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    signOut(auth);
    navigate('/');
  }, [navigate]);

  const { isAuth } = useAuth();

  console.log(isAuth.photoURL)

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
