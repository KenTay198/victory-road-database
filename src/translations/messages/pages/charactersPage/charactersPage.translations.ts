import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type ICharacterPageTranslations from "./characterPage/characterPage.translations";

interface ICharactersPageTranslations extends IDefaultPageTranslations {
  buttons: {
    mode: {
      general: string;
      advanced: string;
    };
    display: {
      table: string;
      grid: string;
    };
  };
  pages: {
    character: ICharacterPageTranslations;
  };
}

export default ICharactersPageTranslations;
