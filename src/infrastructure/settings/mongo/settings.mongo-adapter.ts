import type ISettingsAdapter from "@settings/settings.adapter";
import type { ISettingsDocument } from "./settings.mongo-model";
import Settings from "@settings/settings.entity";
import type { ISettings } from "@settings/settings.types";

export default class MongoSettingsAdapter implements ISettingsAdapter {
  toEntity(data: ISettingsDocument): Settings {
    return new Settings({
      hissatsuLocale: data.hissatsuLocale,
      characterLocale: data.characterLocale,
      userId: data.userId,
    });
  }

  toDatabase(settings: Settings): Partial<ISettings> & { _id: string } {
    const json = settings.toJSON();
    return {
      _id: "",
      hissatsuLocale: json.hissatsuLocale,
      characterLocale: json.characterLocale,
      userId: json.userId,
    };
  }
}
