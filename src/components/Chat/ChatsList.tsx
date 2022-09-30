import React, { useEffect, useState } from "react";

import { doc, DocumentData, onSnapshot } from "firebase/firestore";

import { useAuth } from "context/AuthContext";
import { useChats } from "context/ChatContext";
import { db } from "firebase";

export const ChatsList = () => {
  const [chatsList, setChatsList] = useState<DocumentData | undefined>([]);

  const { isAuth } = useAuth();
  const { dispatch } = useChats();

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", isAuth.uid), (doc) => {
        setChatsList(doc.data());
      });

      return () => {
        unsub();
      };
    };

    isAuth && getChats();
  }, [isAuth]);

  const handleSelect = (user: DocumentData) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chat-list">
      {chatsList &&
        Object.entries(chatsList)
          .sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div
              className="chat-lists"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="user-info">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>{chat[1].lastMessage?.text}</p>
              </div>
            </div>
          ))}
    </div>
  );
};
