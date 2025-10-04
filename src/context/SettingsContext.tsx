"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import type { ISettings } from "@domain/settings/settings.types";
import GetSettings from "@settings/usecases/GetSettings";
import { settingsServiceInstance } from "@utils/repository-instances";
import Settings from "@settings/settings.entity";
import UpdateSettings from "@settings/usecases/UpdateSettings";
import { getServices } from "@/actions/services";

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
  const [settings, setSettings] = useState<Settings>(
    new Settings({
      hissatsuLocale: "jp",
      characterLocale: "vo",
    }),
  );

  const updateSettings = async (newSettings: ISettings): Promise<boolean> => {
    const settings = new Settings(newSettings);
    setSettings(settings);
    const { settingsService } = await getServices();
    return await new UpdateSettings(settingsService).execute(settings);
  };

  useEffect(() => {
    async function init() {
      const { settingsService } = await getServices();
      new GetSettings(settingsService).execute().then(setSettings);
    }

    init();
  }, []);

  return <SettingsContext.Provider value={{ settings: settings, updateSettings }}>{children}</SettingsContext.Provider>;
}
