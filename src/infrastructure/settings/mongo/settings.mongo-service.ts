import type Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type ISettingsService from "@settings/settings.service";
import MongoSettingsRepository from "@infrastructure/settings/mongo/settings.mongo-repository";
import type { ISettings } from "@settings/settings.types";

export default class MongoSettingsService implements ISettingsService {
  private settingsRepository: ISettingsRepository;

  constructor() {
    this.settingsRepository = new MongoSettingsRepository();
  }

  getSettings(userId: string): Promise<Settings> {
    return this.settingsRepository.getSettings(userId);
  }

  updateSettings(userId: string, settings: Partial<ISettings>): Promise<boolean> {
    return this.settingsRepository.updateSettings(userId, settings);
  }
}
