import React from "react";

import { ChatNavbar } from "./ChatNavbar";
import { ChatSearch } from "./ChatSearch";
import { ChatsList } from "./ChatsList";
import "./ChatSidebar.scss";

export const ChatSidebar = () => {
  return (
    <div className="chat-sidebar">
      <ChatNavbar />
      <ChatSearch />
      <ChatsList />
    </div>
  );
};
