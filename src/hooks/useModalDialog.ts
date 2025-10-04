import { useModal, type ModalParams } from "@/context/ModalContext";
import { useMemo } from "react";

interface UseModalDialogParams {
  title?: string;
  content?: React.ReactNode;
  options?: Omit<ModalParams, "title" | "content">;
}

interface ModalDialog {
  open: () => void;
  close: () => void;
}

export const useModalDialog = ({ title, content, options }: UseModalDialogParams): ModalDialog => {
  const { openModal, closeModal } = useModal();

  const modalDialog = useMemo(
    () => ({
      open: () => {
        openModal({
          title,
          content,
          ...options,
        });
      },
      close: closeModal,
    }),
    [title, content, options, openModal, closeModal],
  );

  return modalDialog;
};
