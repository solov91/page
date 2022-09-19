import { useEffect, useState } from 'react';

import { doc, onSnapshot } from 'firebase/firestore';
import { useChats } from '../../context/ChatContext';
import { db } from '../../firebase';

import { Message } from './Message';

import './Messages.scss';

export const Messages = () => {
  const [messages, setMessages] = useState<any>([]);

  const { data } = useChats();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages)
    });

    return () => {
      unSub();
    }
  }, [data.chatId])

  return (
    <div className="messages">
      {messages.map((message: any) => (
        <Message message={message} key={message.id} />

      ))}
    </div>
  );
};
