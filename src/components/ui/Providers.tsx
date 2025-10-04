"use client";
import React from "react";
import LocaleProvider from "@context/LocaleContext";
import SettingsProvider from "@context/SettingsContext";
import ModalRoot from "./ModalRoot";
import { Toaster } from "sonner";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ModalRoot>
        <LocaleProvider>
          <SettingsProvider>{children}</SettingsProvider>
        </LocaleProvider>
      </ModalRoot>
      <Toaster position="top-center" />
    </>
  );
};

export default Providers;
