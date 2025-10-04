import type Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type ISettingsService from "@settings/settings.service";
import StubSettingsRepository from "./settings.stub-repository";
import type { ISettings } from "@settings/settings.types";

export default class StubSettingsService implements ISettingsService {
  private settingsRepository: ISettingsRepository;
  constructor() {
    this.settingsRepository = new StubSettingsRepository();
  }
  getSettings(): Promise<Settings> {
    return this.settingsRepository.getSettings();
  }
  updateSettings(settings: ISettings): Promise<boolean> {
    return this.settingsRepository.updateSettings(settings);
  }
}
