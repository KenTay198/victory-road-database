import Settings from "@settings/settings.entity";
import type ISettingsRepository from "@settings/settings.repository";
import type { ISettings } from "@settings/settings.types";
import SettingsModel from "./settings.mongo-model";
import MongoSettingsAdapter from "./settings.mongo-adapter";
import { connectMongo } from "@infrastructure/database/mongo.config";

export default class MongoSettingsRepository implements ISettingsRepository {
  private adapter = new MongoSettingsAdapter();

  async getSettings(userId: string): Promise<Settings> {
    await connectMongo();
    let document = await SettingsModel.findOne({ userId });
    if (!document) {
      document = await SettingsModel.create(Settings.default(userId).toJSON());
    }
    return this.adapter.toEntity(document);
  }

  async updateSettings(newSettings: Partial<ISettings>, userId: string): Promise<boolean> {
    await connectMongo();
    const result = await SettingsModel.updateOne(
      { userId },
      {
        hissatsuLocale: newSettings.hissatsuLocale,
        characterLocale: newSettings.characterLocale,
      },
      { upsert: true },
    );

    return result.acknowledged;
  }
}
