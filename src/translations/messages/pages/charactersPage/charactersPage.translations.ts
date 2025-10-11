import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type ICharacterPageTranslations from "./characterPage/characterPage.translations";
import type INewCharacterPageTranslations from "./newCharacterPage/newCharacterPage.translations";

interface ICharactersPageTranslations extends IDefaultPageTranslations {
  buttons: {
    mode: {
      general: string;
      advanced: string;
      hissatsu: string;
    };
    display: {
      table: string;
      grid: string;
    };
  };
  actions: {
    add: string;
  };
  character: ICharacterPageTranslations;
  new: INewCharacterPageTranslations;
}

export default ICharactersPageTranslations;
