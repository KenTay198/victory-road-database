import Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type { ISettings } from "@settings/settings.types";

export default class StubSettingsRepository implements ISettingsRepository {
  settings: Settings;

  constructor() {
    this.settings = Settings.default();
  }

  getSettings(): Promise<Settings> {
    return Promise.resolve(this.settings);
  }

  updateSettings(newSettings: ISettings): Promise<boolean> {
    this.settings.characterLocale = newSettings.characterLocale;
    this.settings.hissatsuLocale = newSettings.hissatsuLocale;
    return Promise.resolve(true);
  }
}
