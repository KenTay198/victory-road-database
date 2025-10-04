"use client";
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";

const Modal = () => {
  const { isOpen, params, closeModal } = useModal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeModal]);

  if (!isOpen || !params) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && params.closeOnOverlayClick) {
      closeModal();
    }
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (params.closeOnOverlayClick) {
        closeModal();
      }
    }
  };

  const modalStyles = {
    width: params.width ? (typeof params.width === "number" ? `${params.width}px` : params.width) : "auto",
    maxWidth: params.maxWidth
      ? typeof params.maxWidth === "number"
        ? `${params.maxWidth}px`
        : params.maxWidth
      : "90vw",
    height: params.height ? (typeof params.height === "number" ? `${params.height}px` : params.height) : "auto",
    maxHeight: params.maxHeight
      ? typeof params.maxHeight === "number"
        ? `${params.maxHeight}px`
        : params.maxHeight
      : "90vh",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={handleOverlayClick}
      onKeyDown={handleOverlayKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby={params.title ? "modal-title" : undefined}
      tabIndex={-1}
    >
      <div className="bg-white rounded-lg shadow-xl relative overflow-auto" style={modalStyles} role="document">
        {params.showCloseButton && (
          <button
            type="button"
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            onClick={closeModal}
            aria-label="Close modal"
          >
            <FaTimes size={20} />
          </button>
        )}

        <div className="p-6">
          {params.title && (
            <h2 id="modal-title" className="text-xl font-bold mb-4 pr-8">
              {params.title}
            </h2>
          )}
          <div>{params.content}</div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;
