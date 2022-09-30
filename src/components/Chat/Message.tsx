import React, { useEffect, useRef } from "react";

import { useAuth } from "../../context/AuthContext";
import { useChats } from "../../context/ChatContext";

import { TMessages } from "./Messages";

import defaultAvatar from "../../images/default-avatar.svg";

import "./Message.scss";

type MessageType = {
  message: TMessages;
};

export const Message: React.FC<MessageType> = ({ message }) => {
  const { isAuth } = useAuth();
  const { data } = useChats();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const formatTime = (timestamp: Date) => {
    const time = new Date(timestamp).toLocaleTimeString("ru-RU");

    return (
      <div className="message__date">
        <span>{`${time.slice(0, 5)}`}</span>
      </div>
    );
  };

  const avatar =
    message.senderId === isAuth.uid ? isAuth.photoURL : data.user.photoURL;
  const messageText = message.text ? <p>{message.text}</p> : null;
  const messageImg = message.img ? (
    <a target="_blank" href={message.img} rel="noreferrer">
      <img src={message.img} alt="" />
    </a>
  ) : null;

  return (
    <div
      ref={ref}
      className={message.senderId === isAuth.uid ? "message owner" : "message"}
    >
      <div className="message__info">
        <img src={avatar || defaultAvatar} alt="" />
        {formatTime(message.date.toDate())}
      </div>
      <div className="message__text">
        {messageText}
        {messageImg}
      </div>
    </div>
  );
};
