"use client";
import type React from "react";
import LocaleProvider from "@context/LocaleContext";
import SettingsProvider from "@context/SettingsContext";
import ModalRoot from "./ModalRoot";
import { Toaster } from "sonner";
import AuthProvider from "@context/AuthContext";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalRoot>
        <LocaleProvider>
          <AuthProvider>
            <SettingsProvider>{children}</SettingsProvider>
          </AuthProvider>
        </LocaleProvider>
      </ModalRoot>
      <Toaster
        position="top-center"
        toastOptions={{
          classNames: {
            success: "bg-green-500 text-white",
            error: "bg-red-500 text-white",
            info: "bg-blue-500 text-white",
          },
        }}
      />
    </>
  );
};

export default Providers;
