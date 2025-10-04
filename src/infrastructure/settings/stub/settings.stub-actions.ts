"use server";
import Settings from "@settings/settings.entity";
import type { ISettings } from "@settings/settings.types";

const settings: Settings = Settings.default();

export async function getSettings(): Promise<ISettings> {
  return Promise.resolve(settings.toJSON());
}

export async function updateSettings(newSettings: ISettings): Promise<boolean> {
  settings.hissatsuLocale = newSettings.hissatsuLocale;
  settings.characterLocale = newSettings.characterLocale;
  return Promise.resolve(true);
}
