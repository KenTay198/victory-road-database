import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IImportHissatsusPageTranslations from "./importHissatsusPage/importHissatsusPage.translations";

interface IAdminHissatsusPageTranslations extends IDefaultPageTranslations {
  import: IImportHissatsusPageTranslations;
}

export default IAdminHissatsusPageTranslations;
