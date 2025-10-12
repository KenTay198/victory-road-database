"use server";

import type { ISettings } from "@settings/settings.types";
import StubSettingsService from "@infrastructure/settings/stub/settings.stub-service";
import MongoSettingsService from "@infrastructure/settings/mongo/settings.mongo-service";
import GetSettings from "@settings/usecases/GetSettings";
import UpdateSettings from "@settings/usecases/UpdateSettings";
import type ISettingsService from "../domain/settings/settings.service";

declare global {
  var settingsService: ISettingsService | undefined;
}

const defaultType = process.env.NODE_ENV === "development" ? "stub" : "mongo";

export async function getSettingsServiceInstance(type = defaultType): Promise<ISettingsService> {
  if (globalThis.settingsService) return globalThis.settingsService;

  switch (type) {
    case "mongo":
      globalThis.settingsService = new MongoSettingsService();
      break;
    case "stub":
      globalThis.settingsService = new StubSettingsService();
      break;
    default:
      throw new Error(`Unknown settings service type: ${type}`);
  }

  return globalThis.settingsService;
}

export async function getSettingsAction(userId: string): Promise<ISettings> {
  const settingsService = await getSettingsServiceInstance();
  const settings = await new GetSettings(settingsService).execute(userId);
  return settings.toJSON();
}

export async function updateSettingsAction(userId: string, settings: ISettings): Promise<boolean> {
  const settingsService = await getSettingsServiceInstance();
  return new UpdateSettings(settingsService).execute(userId, settings);
}
