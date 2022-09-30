import React, { createContext, useContext } from "react";

import { onAuthStateChanged, User } from "firebase/auth";
import { PropsWithChildren, useEffect, useState } from "react";
import { auth } from "firebase";

type AuthContextType = {
  isAuth: User;
};

export const AuthContext = createContext({});

export const AuthContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [isAuth, setIsAuth] = useState<User>();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) setIsAuth(user);
    });

    return () => {
      unsub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext) as AuthContextType;
