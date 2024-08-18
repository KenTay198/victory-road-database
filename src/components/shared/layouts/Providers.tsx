import ConfirmModalProvider from "@context/ConfirmModalContext";
import LoadingProvider from "@context/LoadingContext";
import React from "react";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LoadingProvider>
        <ConfirmModalProvider>{children}</ConfirmModalProvider>
      </LoadingProvider>
      <Toaster />
    </>
  );
}

export default Providers;
