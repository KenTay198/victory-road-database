"use client";
import Modal from "@components/ui/Modals/Modal";
import { ModalProvider } from "@/context/ModalContext";
import type { ReactNode } from "react";

interface ModalRootProps {
  children: ReactNode;
}

const ModalRoot = ({ children }: ModalRootProps) => {
  return (
    <ModalProvider>
      {children}
      <Modal />
    </ModalProvider>
  );
};

export default ModalRoot;
