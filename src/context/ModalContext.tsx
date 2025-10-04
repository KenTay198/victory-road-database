"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export interface ModalParams {
  title?: string;
  content: ReactNode;
  width?: string | number;
  maxWidth?: string | number;
  height?: string | number;
  maxHeight?: string | number;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
}

interface ModalContextType {
  openModal: (params: ModalParams) => void;
  closeModal: () => void;
  isOpen: boolean;
  params?: ModalParams;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [params, setParams] = useState<ModalParams | undefined>(undefined);

  const openModal = (modalParams: ModalParams) => {
    setParams({
      showCloseButton: true,
      closeOnOverlayClick: true,
      ...modalParams,
    });
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setParams(undefined);
  };

  return <ModalContext.Provider value={{ openModal, closeModal, isOpen, params }}>{children}</ModalContext.Provider>;
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
