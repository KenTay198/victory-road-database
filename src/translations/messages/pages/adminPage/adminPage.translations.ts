import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IAdminCharactersPageTranslations from "./adminCharactersPage/adminCharactersPage.translations";
import type IAdminMetaPageTranslations from "./adminMetaPage/adminMetaPage.translations";

interface IAdminPageTranslations extends IDefaultPageTranslations {
  characters: IAdminCharactersPageTranslations;
  meta: IAdminMetaPageTranslations;
}

export default IAdminPageTranslations;
