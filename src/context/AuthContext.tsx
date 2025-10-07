"use client";
import type React from "react";
import { createContext, useContext, useState } from "react";
import User from "@user/entities/user.entity";
import type { ICreateUserData, ILoginData } from "@user/user.types";
import { createUserAction, loginAction } from "@/actions/auth.actions";

interface IAuthContext {
  user: User | null;
  register: (settings: ICreateUserData) => Promise<string>;
  login: (settings: ILoginData) => Promise<User | null>;
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

  return <AuthContext.Provider value={{ user, register, login }}>{children}</AuthContext.Provider>;
}
