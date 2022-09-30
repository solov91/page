import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from "react";

import { DocumentData } from "firebase/firestore";

import { useAuth } from "./AuthContext";

type ChatState = {
  chatId?: string;
  users?: unknown;
};

type ChatAtions = {
  type: string;
  payload: {
    uid: string;
  };
};

type ChatContextType = {
  dispatch: React.Dispatch<DocumentData>;
  data: DocumentData;
};

export const ChatContext = createContext({});

export const ChatContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { isAuth } = useAuth();

  const INITIAL_STATE: ChatState = {
    chatId: "null",
    users: {},
  };

  const chatReducer = (state: ChatState, action: ChatAtions) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          user: action.payload,
          chatId:
            isAuth.uid > action.payload.uid
              ? isAuth.uid + action.payload.uid
              : action.payload.uid + isAuth.uid,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChats = () => useContext(ChatContext) as ChatContextType;
