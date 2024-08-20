"use client";
import { Spinner } from "@atoms/Spinner";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import React from "react";
import Header from "./Header/Header";
import ProtectedRoute from "@layouts/ProtectedRoute";
import Modal from "@organisms/Modal/Modal";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoadingState();

  return (
    <ProtectedRoute>
      <div className="relative">
        <ConfirmModal />
        {isLoading && (
          <div className="fixed w-screen h-screen top-0 left-0 z-[12] bg-white bg-opacity-70">
            <Spinner />
          </div>
        )}
        <Header />
        <main className="p-5 pt-12">{children}</main>
      </div>
    </ProtectedRoute>
  );
}

function ConfirmModal() {
  const { modalOpen, modalDatas, close } = useConfirmModalState();
  if (!modalDatas) return;
  const { title, description, callback, options } = modalDatas;

  return (
    <Modal
      open={modalOpen}
      title={title}
      close={close}
      options={options}
      actions={[
        {
          label: "Yes",
          color: "success",
          actionFunction: () => callback().then(() => close()),
        },
        { label: "Non", color: "error", actionFunction: close },
      ]}
    >
      <p>{description}</p>
    </Modal>
  );
}

export default DefaultLayout;
