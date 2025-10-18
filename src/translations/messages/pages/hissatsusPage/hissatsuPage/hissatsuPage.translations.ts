import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IUpdateHissatsuPageTranslations from "./updateHissatsuPage/updateHissatsuPage.translations";

interface IHissatsuPageTranslations extends IDefaultPageTranslations {
  sections: {
    general: string;
    translations: string;
  };
  actions: {
    update: string;
  };
  update: IUpdateHissatsuPageTranslations;
}

export default IHissatsuPageTranslations;
