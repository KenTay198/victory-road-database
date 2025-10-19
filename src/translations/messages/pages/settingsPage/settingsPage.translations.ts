import type { IToastTranslations } from "@translations/messages/messages.translations";
import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";

interface ISettingsPageTranslations extends IDefaultPageTranslations {
  inputs: {
    characterLocale: {
      label: string;
      description: string;
    };
    hissatsuLocale: {
      label: string;
      description: string;
    };
  };
  toasts: {
    update: IToastTranslations;
  };
}

export default ISettingsPageTranslations;
