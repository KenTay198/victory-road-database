import type Settings from "@settings/settings.entity";
import type { ISettings } from "./settings.types";

interface ISettingsRepository {
  getSettings(userId?: string): Promise<Settings>;
  updateSettings(settings: Partial<ISettings>, userId?: string): Promise<boolean>;
}

export default ISettingsRepository;
