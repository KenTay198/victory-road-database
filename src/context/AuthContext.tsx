"use client";
import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import User from "@user/entities/user.entity";
import type { ICreateUserData, ILoginData } from "@user/user.types";
import { createUserAction, getCurrentUserAction, loginAction, logoutAction } from "@/actions/auth.actions";

interface IAuthContext {
  user: User | null;
  register: (settings: ICreateUserData) => Promise<string>;
  login: (settings: ILoginData) => Promise<User | null>;
  logout: () => Promise<boolean>;
  getAuthUser: () => Promise<User | null>;
}

//@ts-expect-error
const AuthContext = createContext<IAuthContext>({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const register = (userData: ICreateUserData): Promise<string> => {
    return createUserAction(userData);
  };

  const login = async (loginData: ILoginData): Promise<User | null> => {
    let user: User | null = null;
    const result = await loginAction(loginData);
    if (result) {
      user = new User(result);
      setUser(user);
    }
    return user;
  };

  const logout = async (): Promise<boolean> => {
    const result = await logoutAction();
    if (result) {
      setUser(null);
    }
    return result;
  };

  const getAuthUser = async (): Promise<User | null> => {
    let user: User | null = null;
    const result = await getCurrentUserAction();
    if (result) {
      user = new User(result);
      setUser(user);
    }
    return user;
  };

  useEffect(() => {
    getAuthUser().then(setUser);
  }, []);

  return <AuthContext.Provider value={{ user, register, login, logout, getAuthUser }}>{children}</AuthContext.Provider>;
}
