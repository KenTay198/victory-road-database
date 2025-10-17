import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IImportCharactersPageTranslations from "./importCharactersPage/importCharactersPage.translations";

interface IAdminCharactersPageTranslations extends IDefaultPageTranslations {
  import: IImportCharactersPageTranslations;
}

export default IAdminCharactersPageTranslations;
