import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IUpdateCharacterPageTranslations from "./updateCharacterPage/updateCharacterPage.translations";

interface ICharacterPageTranslations extends Omit<IDefaultPageTranslations, "header"> {
  sections: {
    general: string;
    statistics: string;
    hissatsus: string;
  };
  actions: {
    update: string;
  };
  update: IUpdateCharacterPageTranslations;
}

export default ICharacterPageTranslations;
