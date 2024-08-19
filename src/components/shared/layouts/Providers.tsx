import AuthProvider from "@context/AuthContext";
import ConfirmModalProvider from "@context/ConfirmModalContext";
import LoadingProvider from "@context/LoadingContext";
import React from "react";
import { Toaster } from "sonner";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <LoadingProvider>
          <ConfirmModalProvider>{children}</ConfirmModalProvider>
        </LoadingProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default Providers;
