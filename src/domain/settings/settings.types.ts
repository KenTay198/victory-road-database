import type { CharacterLocale } from "@character/character.types";
import type { HissatsuLocale } from "@hissatsu/hissatsu.types";

export interface ISettings {
  userId: string;
  hissatsuLocale: HissatsuLocale;
  characterLocale: CharacterLocale;
}
