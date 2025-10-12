import type Settings from "@settings/settings.entity";
import type { ISettings } from "./settings.types";

interface ISettingsRepository {
  getSettings(userId: string): Promise<Settings>;
  updateSettings(userId: string, settings: Partial<ISettings>): Promise<boolean>;
}

export default ISettingsRepository;
