import React, { useEffect, useState } from 'react';

import { doc, onSnapshot, Timestamp } from 'firebase/firestore';
import { useChats } from '../../context/ChatContext';
import { db } from '../../firebase';

import { Message } from './Message';

import './Messages.scss';

export type TMessages = {
 date: Timestamp,
 id: string,
 senderId: string,
 text: string,
 img?: string,
}

export const Messages = () => {
  const [messages, setMessages] = useState<TMessages[] | undefined>([]);

  const { data } = useChats();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub();
    }
  }, [data.chatId]);

  if (!messages || messages.length < 1) return <div className="chat__instructions">Выберете пользователя</div>

  return (
    <div className="messages">
      {messages && messages.map((message, i) => {
        let date = null;
        const currentDate = new Date(message.date.toDate()).toLocaleDateString("ru-RU");
        if (i === 0) {
          date = currentDate
        } else {
          const prevDate = new Date(messages[i - 1].date.toDate()).toLocaleDateString("ru-RU");
          if (currentDate !== prevDate) date = currentDate;
        }
        return (
          <React.Fragment>
            {date && (<div className="messages__date"><span>{date}</span></div>)}
            <Message message={message} key={message.id} />
          </React.Fragment>
        )
      }
      )}
    </div>
  );
};
