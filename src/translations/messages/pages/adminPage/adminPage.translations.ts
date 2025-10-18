import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IAdminCharactersPageTranslations from "./adminCharactersPage/adminCharactersPage.translations";
import type IAdminMetaPageTranslations from "./adminMetaPage/adminMetaPage.translations";
import type IAdminHissatsusPageTranslations from "./adminHissatsusPage/adminHissatsusPage.translations";

interface IAdminPageTranslations extends IDefaultPageTranslations {
  characters: IAdminCharactersPageTranslations;
  meta: IAdminMetaPageTranslations;
  hissatsus: IAdminHissatsusPageTranslations;
}

export default IAdminPageTranslations;
