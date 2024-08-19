"use client";
import Button from "@atoms/Button";
import { Spinner } from "@atoms/Spinner";
import { useConfirmModalState } from "@context/ConfirmModalContext";
import { useLoadingState } from "@context/LoadingContext";
import React from "react";
import { FaTimes } from "react-icons/fa";
import Header from "./Header/Header";
import ProtectedRoute from "@layouts/ProtectedRoute";

function DefaultLayout({ children }: { children: React.ReactNode }) {
  const { isLoading } = useLoadingState();
  const { modalOpen, modalDatas } = useConfirmModalState();

  return (
    <ProtectedRoute>
      <div className="relative">
        {modalOpen && modalDatas && <ConfirmModal />}
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
  const { modalDatas, close } = useConfirmModalState();
  if (!modalDatas) return;
  const { title, description, callback, options } = modalDatas;

  return (
    <div
      className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-70 z-[11]"
      onClick={() => close()}
    >
      <div
        style={{
          maxWidth: options && options.width ? `${options.width}px` : "1000px",
        }}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative border shadow-lg p-3 rounded-lg bg-white w-full">
          <FaTimes
            size={20}
            className="absolute top-2 right-2 cursor-pointer"
            onClick={() => close()}
          />
          <div className="relative border-b">
            <p className="text-xl font-bold">{title}</p>
          </div>
          <div className="py-2">
            <p>{description}</p>
          </div>
          <div className="flex justify-center gap-5 py-2">
            <Button
              color="success"
              onClick={() => {
                callback().then(() => close());
              }}
            >
              Yes
            </Button>
            <Button color="error" onClick={() => close()}>
              No
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DefaultLayout;
