import { useEffect, useRef } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useChats } from '../../context/ChatContext';

import './Message.scss';
import { TMessages } from './Messages';

type MessageType = {
  message: TMessages
}

export const Message:React.FC<MessageType> = ({ message }) => {
  const { isAuth } = useAuth();
  const { data } = useChats();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message]);

  const formatTime = (timestamp: Date) => {
    const time = new Date(timestamp).toLocaleTimeString("ru-RU");
    const date = new Date(timestamp).toLocaleDateString("ru-RU");

    return (
      <div className="message__date">
        <span>{`${time.slice(0, 5)}`}</span>
        <span>{`${date}`}</span>
      </div>);
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === isAuth.uid && 'owner'}`}
    >
      <div className="message__info">
        <img
          src={message.senderId === isAuth.uid
            ? isAuth.photoURL 
            : data.user.photoURL
          }
          alt=""
        />
        {formatTime(message.date.toDate())}
      </div>
      <div className="message__text">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}
