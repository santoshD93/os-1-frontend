import { createContext, ReactNode, useEffect, useState } from "react";
import store2 from 'store2';
import { useNavigate } from "react-router-dom";
import { LocalRoutes, StorageKey } from "../consts";
import { User } from "../types";
import { useProfile } from "../hooks";

interface IAuthContext {
  user: User | null;
  setUser: (user: User) => void;
  logOut: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  user: null,
  setUser: () => {},
  logOut: () => {},
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const token = store2.get(StorageKey.Token);
  const { data, isError } = useProfile(!!token);

  useEffect(() => {
    if (data?.data) {
      setUser(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      logOut();
    }
  }, [isError]);

  const handleSetUser = (user: User) => {
    setUser(user)
  }

  const logOut = () => {
    setUser(null);
    store2.remove(StorageKey.Token);
    navigate(LocalRoutes.SignIn);
  }

  return (
    <AuthContext.Provider value={{ user, setUser: handleSetUser, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

