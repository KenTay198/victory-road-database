import AuthProvider from "@context/AuthContext";
import ConfirmModalProvider from "@context/ConfirmModalContext";
import LoadingProvider from "@context/LoadingContext";
import React from "react";
import { Toaster } from "sonner";
import AuthRoute from "./AuthRoute";

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AuthProvider>
        <LoadingProvider>
          <ConfirmModalProvider>
            <AuthRoute>{children}</AuthRoute>
          </ConfirmModalProvider>
        </LoadingProvider>
      </AuthProvider>
      <Toaster />
    </>
  );
}

export default Providers;
