"use client";
import { IUser } from "@/types/user.types";
import React, { createContext, useContext, useState } from "react";

type User = Omit<IUser, "password">;

interface IAuthContext {
  user?: User;
  setUser: (value: User) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const AuthContext = createContext<IAuthContext>({});

export const useAuthState = () => {
  const context = useContext(AuthContext);
  return context;
};

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | undefined>();

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
