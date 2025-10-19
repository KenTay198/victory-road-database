import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";
import type IHissatsuPageTranslations from "./hissatsuPage/hissatsuPage.translations";
import type INewHissatsuPageTranslations from "./newHissatsuPage/newHissatsuPage.translations";

interface IHissatsusPageTranslations extends IDefaultPageTranslations {
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
  actions: {
    add: string;
  };
  hissatsu: IHissatsuPageTranslations;
  new: INewHissatsuPageTranslations;
}

export default IHissatsusPageTranslations;
