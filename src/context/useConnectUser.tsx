import React from "react";
import type { UserType } from "../type/UserType";

const USER_STORAGE_KEY = "spendwise-user";

type ConnectUserContextValue = {
  user: UserType | null;
  isAuthenticated: boolean;
  setUser: (user: UserType) => void;
  logout: () => void;
};

const ConnectUserContext = React.createContext<
  ConnectUserContextValue | undefined
>(undefined);

export const ConnectUserProvider = ({ children }: React.PropsWithChildren) => {
  const [user, setUserState] = React.useState<UserType | null>(() => {
    const storedUser = localStorage.getItem(USER_STORAGE_KEY);
    return storedUser ? (JSON.parse(storedUser) as UserType) : null;
  });

  const setUser = (connectedUser: UserType) => {
    const userWithoutPassword = { ...connectedUser };
    delete userWithoutPassword.password;
    setUserState(userWithoutPassword);
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(userWithoutPassword));
  };

  const logout = () => {
    setUserState(null);
    localStorage.removeItem(USER_STORAGE_KEY);
  };

  return (
    <ConnectUserContext.Provider
      value={{ user, isAuthenticated: user !== null, setUser, logout }}
    >
      {children}
    </ConnectUserContext.Provider>
  );
};

const useConnectUser = () => {
  const context = React.useContext(ConnectUserContext);
  if (!context) {
    throw new Error("useConnectUser must be used within ConnectUserProvider");
  }
  return context;
};

export default useConnectUser;
