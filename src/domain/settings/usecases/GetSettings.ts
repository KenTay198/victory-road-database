import type Settings from "@settings/settings.entity";
import type ISettingsService from "@settings/settings.service";
import DomainError from "@domain/shared/domainError/domainError";

export default class GetSettings {
  constructor(private settingsService: ISettingsService) {}

  async execute(): Promise<Settings> {
    try {
      return await this.settingsService.getSettings();
    } catch (error: any) {
      throw DomainError.handleError(error);
    }
  }
}
