import type Settings from "@settings/settings.entity";
import type { ISettings } from "./settings.types";

interface ISettingsService {
  getSettings(): Promise<Settings>;
  updateSettings(settings: ISettings): Promise<boolean>;
}

export default ISettingsService;
