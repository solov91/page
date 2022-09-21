import { InputPanel } from './InputPanel';
import { Messages } from './Messages';

import './ChatWindow.scss';
import { useChats } from '../../context/ChatContext';

export const ChatWindow = () => {
  const { data } = useChats();

  return (
    <div className="chat">
      <div className="chat__info">
        <span>{data.user?.displayName}</span>
      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};
