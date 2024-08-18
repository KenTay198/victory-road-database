"use client";
import React, { createContext, useContext, useState } from "react";

interface IModalOptions {
  width?: number;
}

interface IModalDatas {
  title: string;
  description: string;
  callback: () => Promise<void>;
  options?: IModalOptions;
}

interface IConfirmModalContext {
  showConfirm: (
    title: string,
    description: string,
    callback: () => Promise<void>,
    options?: IModalOptions
  ) => void;
  close: () => void;
  modalOpen: boolean;
  modalDatas?: IModalDatas;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
const ConfirmModalContext = createContext<IConfirmModalContext>({});

export const useConfirmModalState = () => {
  const context = useContext(ConfirmModalContext);
  return context;
};

export default function ConfirmModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalDatas, setModalDatas] = useState<IModalDatas | undefined>();

  const showConfirm = (
    title: string,
    description: string,
    callback: () => Promise<void>,
    options?: IModalOptions
  ) => {
    setModalOpen(true);
    setModalDatas({ title, description, callback, options });
  };

  const close = () => {
    setModalOpen(false);
    setModalDatas(undefined);
  };

  return (
    <ConfirmModalContext.Provider
      value={{ showConfirm, close, modalOpen, modalDatas }}
    >
      {children}
    </ConfirmModalContext.Provider>
  );
}
