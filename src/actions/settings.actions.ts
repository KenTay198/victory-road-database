"use server";

import type { ISettings } from "@settings/settings.types";
import GetSettings from "@settings/usecases/GetSettings";
import UpdateSettings from "@settings/usecases/UpdateSettings";
import type ISettingsService from "../domain/settings/settings.service";
import SettingsService, { type SettingsRepositoryType } from "@infrastructure/settings/settings.default-service";

declare global {
  var settingsService: ISettingsService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getSettingsServiceInstance(
  type: SettingsRepositoryType = defaultType,
): Promise<ISettingsService> {
  if (type !== "cookie" && globalThis.settingsService) return globalThis.settingsService;

  globalThis.settingsService = new SettingsService(type);

  return globalThis.settingsService;
}

export async function getSettingsAction(userId?: string): Promise<ISettings> {
  const settingsService = await getSettingsServiceInstance(userId ? defaultType : "cookie");
  const settings = await new GetSettings(settingsService).execute(userId);
  return settings.toJSON();
}

export async function updateSettingsAction(settings: ISettings, userId?: string): Promise<boolean> {
  const settingsService = await getSettingsServiceInstance(userId ? defaultType : "cookie");
  return new UpdateSettings(settingsService).execute(settings, userId);
}
