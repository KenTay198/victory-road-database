import Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type { ISettings } from "@settings/settings.types";

export default class StubSettingsRepository implements ISettingsRepository {
  private userSettings: Map<string, Settings>;

  constructor() {
    this.userSettings = new Map();
  }

  getSettings(userId: string): Promise<Settings> {
    if (!this.userSettings.has(userId)) {
      const defaultSettings = Settings.default(userId);
      this.userSettings.set(userId, defaultSettings);
    }
    const userSettings = this.userSettings.get(userId);
    return Promise.resolve(userSettings as Settings);
  }

  updateSettings(newSettings: Partial<ISettings>, userId: string): Promise<boolean> {
    if (!this.userSettings.has(userId)) {
      this.userSettings.set(userId, Settings.default(userId));
    }

    const userSettings = this.userSettings.get(userId);
    if (userSettings) {
      userSettings.characterLocale = newSettings.characterLocale ?? userSettings.characterLocale;
      userSettings.hissatsuLocale = newSettings.hissatsuLocale ?? userSettings.hissatsuLocale;
    }

    return Promise.resolve(true);
  }
}
