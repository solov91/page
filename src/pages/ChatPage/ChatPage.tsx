import { ChatWindow, ChatSidebar } from '../../components/Chat';

import './ChatPage.scss'

export const ChatPage = () => {
  return (
    <div className="chat-page">
      <div className="chat-page__container">
        <ChatSidebar />
        <ChatWindow />
      </div>
    </div>
  );
};
