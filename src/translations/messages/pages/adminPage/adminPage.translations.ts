import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IAdminCharactersPageTranslations from "./adminCharactersPage/adminCharactersPage.translations";

interface IAdminPageTranslations extends IDefaultPageTranslations {
  characters: IAdminCharactersPageTranslations;
}

export default IAdminPageTranslations;
