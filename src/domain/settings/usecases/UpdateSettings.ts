import type { ISettings } from "@settings/settings.types";
import type ISettingsService from "@settings/settings.service";
import DomainError from "@domain/shared/domainError/domainError";

export default class UpdateSettings {
  constructor(private settingsService: ISettingsService) {}

  async execute(settings: Partial<ISettings>, userId?: string): Promise<boolean> {
    try {
      return await this.settingsService.updateSettings(settings, userId);
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
