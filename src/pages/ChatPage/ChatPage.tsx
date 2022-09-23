import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { ChatWindow, ChatSidebar } from '../../components/Chat';

import { useAuth } from '../../context/AuthContext';

import './ChatPage.scss'

export const ChatPage = () => {
  const { isAuth } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuth) return navigate('/');
  }, [isAuth, navigate]);

  return (
    <div className="chat-page">
      <div className="chat-page__container">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
};
