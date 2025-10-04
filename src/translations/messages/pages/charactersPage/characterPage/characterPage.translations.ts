import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";

interface ICharacterPageTranslations extends Omit<IDefaultPageTranslations, "header"> {
  sections: {
    general: string;
    statistics: string;
    hissatsus: string;
  };
}

export default ICharacterPageTranslations;
