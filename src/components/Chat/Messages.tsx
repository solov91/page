import React, { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { useChats } from '../../context/ChatContext';
import { db } from '../../firebase';

import { Message } from './Message';

import './Messages.scss';

export type TMessages = {
 date: any,
 id: string,
 senderId: string,
 text: string,
 img?: string
}

export const Messages = () => {
  const [messages, setMessages] = useState<TMessages[]>([]);

  console.log(messages)

  const { data } = useChats();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub();
    }
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((message: TMessages) => (
        <React.Fragment>
          <Message message={message} key={message.id} />
        </React.Fragment>
      ))}
    </div>
  );
};
