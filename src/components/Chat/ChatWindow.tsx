import React from "react";
import { InputPanel } from "./InputPanel";
import { Messages } from "./Messages";

import { useChats } from "context/ChatContext";

import "./ChatWindow.scss";

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
