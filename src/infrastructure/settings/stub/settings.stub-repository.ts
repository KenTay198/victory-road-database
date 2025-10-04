import Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type { ISettings } from "@settings/settings.types";

export default class StubSettingsRepository implements ISettingsRepository {
  settings: Settings;

  constructor() {
    this.settings = Settings.default();
  }

  async getSettings(): Promise<Settings> {
    return this.settings;
  }

  updateSettings(newSettings: ISettings): Promise<boolean> {
    this.settings.hissatsuLocale = newSettings.hissatsuLocale;
    this.settings.characterLocale = newSettings.characterLocale;
    return Promise.resolve(true);
  }
}
