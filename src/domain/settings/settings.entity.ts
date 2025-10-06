import type { ISettings } from "@settings/settings.types";
import type { CharacterLocale } from "@character/character.types";
import type { HissatsuLocale } from "@hissatsu/hissatsu.types";

export default class Settings implements ISettings {
  hissatsuLocale: HissatsuLocale;
  characterLocale: CharacterLocale;

  constructor(data: ISettings) {
    this.hissatsuLocale = data.hissatsuLocale;
    this.characterLocale = data.characterLocale;
  }

  static default(): Settings {
    return new Settings({
      hissatsuLocale: "jp",
      characterLocale: "fr",
    });
  }

  //#region Utils
  static fromJSON(data: ISettings): Settings {
    return new Settings(data);
  }

  toJSON(): ISettings {
    return {
      hissatsuLocale: this.hissatsuLocale,
      characterLocale: this.characterLocale,
    };
  }
  //#endregion
}
