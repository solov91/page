import { useAuth } from '../../context/AuthContext';

import './ChatNavbar.scss';

export const ChatNavbar = () => {
  const { isAuth } = useAuth();

  return (
    <div className="chat-navbar">
      <span className="logo">Чат</span>
      <div className="chat-navbar__user-info">
        <img src={isAuth?.photoURL || ''} alt="" />
        <span>{isAuth?.displayName}</span>
      </div>
    </div>
  )
}
