import { useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signOut, User } from 'firebase/auth';

import { auth } from '../../firebase';

import './Navigation.scss';

type NavigationProps = {
  isAuth: User
}

export const Navigation:React.FC<NavigationProps> = ({ isAuth }) => {
  const navigate = useNavigate();

  const handleSignOut = useCallback(() => {
    signOut(auth);
    navigate(0);
  }, [navigate]);

  return (
    <div className="navigation">
      <Link to="/chat">Чат</Link>

      {isAuth ? 
        <button className="navigation__sing-out" onClick={handleSignOut}>Выйти</button>
        :
        <Link to="/authorization">Авторизация</Link>
      }
    </div>
  )
}
