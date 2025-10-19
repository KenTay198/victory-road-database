import Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type { ISettings } from "@settings/settings.types";
import { cookies } from "next/headers";

export default class CookieSettingsRepository implements ISettingsRepository {
  private userSettings: Map<string, Settings>;
  private cookieName = "vr_settings";

  constructor() {
    this.userSettings = new Map();
  }

  async getSettings(): Promise<Settings> {
    const cookieStore = await cookies();
    const settingsJSON = cookieStore.get(this.cookieName)?.value;
    let settings = Settings.default();
    if (settingsJSON) {
      try {
        const parsedSettings: ISettings = JSON.parse(settingsJSON);
        settings = Settings.fromJSON(parsedSettings);
      } catch {}
    } else {
      settings = Settings.default();
    }

    return settings;
  }

  async updateSettings(newSettings: Partial<ISettings>): Promise<boolean> {
    const cookieStore = await cookies();
    const settingsJSON = cookieStore.get(this.cookieName)?.value;
    let settings = Settings.default();
    if (settingsJSON) {
      try {
        const parsedSettings: ISettings = JSON.parse(settingsJSON);
        settings = Settings.fromJSON(parsedSettings);
      } catch {}
    } else {
      settings = Settings.default();
    }

    settings.characterLocale = newSettings.characterLocale ?? settings.characterLocale;
    settings.hissatsuLocale = newSettings.hissatsuLocale ?? settings.hissatsuLocale;

    cookieStore.set({
      name: this.cookieName,
      value: JSON.stringify(settings.toJSON()),
    });
    return Promise.resolve(true);
  }
}
