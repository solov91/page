import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { signOut, User } from 'firebase/auth';

import { auth } from '../../firebase';
import { routes } from '../../constants';

import './Navigation.scss';
import classNames from 'classnames';

type NavigationProps = {
  isAuth: User
}

export const Navigation:React.FC<NavigationProps> = ({ isAuth }) => {
  const navigate = useNavigate();
  const loaction = useLocation();
  console.log(isAuth);

  const handleSignOut = useCallback(() => {
    signOut(auth);
    navigate(0);
  }, [navigate]);

  return (
    <div className="navigation">
      <div className="navigation__list">
        <Link
          className={classNames(
            'navigation__link', 
            {'current-location': loaction.pathname === routes.home}
          )}
          to={routes.home}
          tabIndex={loaction.pathname === routes.home ? -1 : 0}
        >
          Домой
        </Link>
        {isAuth && 
        <Link
          className={classNames(
            'navigation__link', 
            {'current-location': loaction.pathname === routes.chat}
          )}
          to={routes.chat}
          tabIndex={loaction.pathname === routes.chat ? -1 : 0}
        >
          Чат
        </Link>
        }
        <Link
          className={classNames(
            'navigation__link', 
            {'current-location': loaction.pathname === routes.calendar}
          )}
          to={routes.calendar}
          tabIndex={loaction.pathname === routes.calendar ? -1 : 0}
        >
          Календарь
        </Link>
      </div>
      <div className="navigation__sing-out">
        {isAuth ? 
          <button
            className="navigation__link"
            onClick={handleSignOut}>
              Выйти
            </button>
          :
          <Link
            className="navigation__link"
            to={routes.authorization}
          >
            Авторизация
          </Link>
        }
      </div>
    </div>
  )
}
