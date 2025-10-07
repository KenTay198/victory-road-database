import type ICharactersPageTranslations from "./charactersPage/charactersPage.translations";
import type IErrorPageTranslations from "./errorPage/errorPage.translations";
import type IGlossaryPageTranslations from "./glossaryPage/glossaryPage.translations";
import type IHissatsusPageTranslations from "./hissatsusPage/hissatsusPage.translations";
import type IHomePageTranslations from "./homePage/homePage.translations";
import type IRegisterPageTranslations from "./registerPage/registerPage.translations";
import type ISettingsPageTranslations from "./settingsPage/settingsPage.translations";

interface IPagesTranslations {
  home: IHomePageTranslations;
  characters: ICharactersPageTranslations;
  error: IErrorPageTranslations;
  glossary: IGlossaryPageTranslations;
  settings: ISettingsPageTranslations;
  hissatsus: IHissatsusPageTranslations;
  register: IRegisterPageTranslations;
}

export default IPagesTranslations;

export interface IDefaultPageTranslations {
  metadata: IMetadataTranslations;
  header: string;
}

export interface IMetadataTranslations {
  title: string;
  description: string;
}
