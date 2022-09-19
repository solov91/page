import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useReducer,
} from 'react';

import { useAuth } from './AuthContext';


type ChatContextType = {
  dispatch: any,
  data: any,
}

export const ChatContext = createContext({});

export const ChatContextProvider:React.FC<PropsWithChildren> = ({ children }) => {
  const { isAuth } = useAuth();

  const INITIAL_STATE = {
    chatId: 'null',
    users: {},
  };

  const chatReducer = (state: any, action: any) => {
    switch (action.type) {
      case 'CHANGE_USER':
        return {
          user: action.payload,
          chatId: isAuth.uid > action.payload.uid
            ? isAuth.uid + action.payload.uid
            : action.payload.uid + isAuth.uid,
        }
        
      default: 
        return state;
    };
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  )
};

export const useChats = () => useContext(ChatContext) as ChatContextType;
