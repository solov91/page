import { useEffect, useRef } from 'react';

import { useAuth } from '../../context/AuthContext';
import { useChats } from '../../context/ChatContext';

import './Message.scss';

type MessageType = {
  message: any
}

export const Message:React.FC<MessageType> = ({ message }) => {
  const { isAuth } = useAuth();
  const { data } = useChats();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }, [message])

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
        <span>just now</span>
      </div>
      <div className="message__text">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  )
}
