"use client";
import Button, { ButtonColor } from "@atoms/Button";
import React, { useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { FaTimes } from "react-icons/fa";

interface IAction {
  label: string;
  actionFunction: () => void;
  color: ButtonColor;
}

interface IProps {
  title: string;
  children: React.ReactNode;
  open: boolean;
  close: () => void;
  actions?: IAction[];
  className?: string;
  options?: {
    width?: number;
  };
}

function Modal({
  options,
  open,
  className,
  title,
  children,
  actions,
  close,
}: IProps) {
  const modalRoot = useMemo(() => document.getElementById("modal-root"), []);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.classList.add("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [open]);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [children]);

  if (!modalRoot || !open) return null;

  return createPortal(
    <div
      className="fixed w-screen h-screen top-0 left-0 bg-black bg-opacity-70 z-[11]"
      onClick={() => close()}
    >
      <div
        style={{
          maxWidth: options && options.width ? `${options.width}px` : "1000px",
        }}
        className={[
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-5 w-full",
          className,
        ].join("")}
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

          <div className="py-2" ref={ref}>
            {children}
          </div>

          {actions && (
            <div className="flex justify-center gap-5 py-2">
              {actions.map(({ label, actionFunction, color }) => (
                <Button
                  key={`modal-action-${label}`}
                  color={color}
                  onClick={actionFunction}
                >
                  {label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;
