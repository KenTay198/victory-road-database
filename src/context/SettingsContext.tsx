"use client";
import type React from "react";
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import type { ISettings } from "@domain/settings/settings.types";
import Settings from "@settings/settings.entity";
import { getSettingsAction } from "@/actions/settings.actions";
import { updateSettingsAction } from "@/actions/settings.actions";
import { useAuth } from "./AuthContext";

interface ISettingsContext {
  settings: Settings;
  updateSettings: (settings: ISettings) => Promise<boolean>;
}

//@ts-expect-error
const SettingsContext = createContext<ISettingsContext>({});

export const useSettings = () => {
  const context = useContext(SettingsContext);
  return context;
};

export default function SettingsProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState<Settings>(Settings.default());

  const updateSettings = async (newSettings: ISettings): Promise<boolean> => {
    const settings = new Settings(newSettings);
    setSettings(settings);
    return await updateSettingsAction(newSettings);
  };

  useEffect(() => {
    async function init() {
      getSettingsAction(user?.id).then((settings) => setSettings(new Settings(settings)));
    }

    init();
  }, [user]);

  return <SettingsContext.Provider value={{ settings: settings, updateSettings }}>{children}</SettingsContext.Provider>;
}
