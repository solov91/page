import { Link } from 'react-router-dom';

import { ChatWindow, ChatSidebar } from '../../components/Chat';

import { useAuth } from '../../context/AuthContext';

import './ChatPage.scss'

export const ChatPage = () => {
  const { isAuth } = useAuth();

  if (!isAuth) return <Link to="/authorization">Сначала зарегистрируйтесь</Link>
  
  return (
    <div className="chat-page">
      <div className="chat-page__container">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
};
