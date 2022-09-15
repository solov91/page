import './ChatWindow.scss';
import { InputPanel } from './InputPanel';
import { Messages } from './Messages';

export const ChatWindow = () => {
  return (
    <div className="chat">
      <div className="chat__info">
        <span>user name</span>

      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};
