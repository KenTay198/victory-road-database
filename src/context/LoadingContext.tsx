"use client";
import React, { createContext, useContext, useState } from "react";

interface ILoadingContext {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const LoadingContext = createContext<ILoadingContext>({});

export const useLoadingState = () => {
  const context = useContext(LoadingContext);
  return context;
};

export default function LoadingProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}
