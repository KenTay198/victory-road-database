import type Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type ISettingsService from "@settings/settings.service";
import type { ISettings } from "@settings/settings.types";
import MongoSettingsRepository from "./mongo/settings.mongo-repository";
import StubSettingsRepository from "./stub/settings.stub-repository";
import CookieSettingsRepository from "./cookie/settings.cookie-repository";

export type SettingsRepositoryType = "stub" | "mongo" | "cookie";

export default class SettingsService implements ISettingsService {
  private settingsRepository: ISettingsRepository;
  constructor(type: "stub" | "mongo" | "cookie") {
    switch (type) {
      case "mongo":
        this.settingsRepository = new MongoSettingsRepository();
        break;
      case "cookie":
        this.settingsRepository = new CookieSettingsRepository();
        break;
      case "stub":
        this.settingsRepository = new StubSettingsRepository();
        break;
      default:
        throw new Error(`Unknown settings repository type: ${type}`);
    }
  }
  getSettings(userId: string): Promise<Settings> {
    return this.settingsRepository.getSettings(userId);
  }

  updateSettings(settings: Partial<ISettings>, userId: string): Promise<boolean> {
    return this.settingsRepository.updateSettings(settings, userId);
  }
}
