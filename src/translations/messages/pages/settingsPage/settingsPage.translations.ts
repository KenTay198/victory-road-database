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
    update: {
      success: string;
      error: string;
      loading: string;
    };
  };
}

export default ISettingsPageTranslations;
