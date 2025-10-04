import type Settings from "@settings/settings.entity";
import type ISettingsService from "@settings/settings.service";
import DomainError from "@domain/domainError";

export default class UpdateSettings {
  constructor(private settingsService: ISettingsService) {}

  async execute(settings: Settings): Promise<boolean> {
    try {
      return this.settingsService.updateSettings(settings);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
