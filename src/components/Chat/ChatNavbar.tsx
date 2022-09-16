import { useCallback } from 'react';

import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

import { useAuth } from '../../context/AuthContext';

import defaultAvatar from '../../images/default-avatar.svg'

import './ChatNavbar.scss';

export const ChatNavbar = () => {
  const handleSignOut = useCallback(() => {
    signOut(auth)
  }, []);

  const { isAuth } = useAuth();

  return (
    <div className="chat-navbar">
      <span className="logo">Чат</span>
      <div className="chat-navbar__user-info">
        <img src={isAuth?.photoURL || ''} alt="" />
        <span>Name</span>
        <button onClick={handleSignOut}>Выйти</button>
      </div>
    </div>
  )
}
