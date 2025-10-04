import type { IDefaultPageTranslations } from "@translations/messages/pages/pages.translations";

interface ISettingsPageTranslations extends IDefaultPageTranslations {
  toasts: {
    update: {
      success: string;
      error: string;
      loading: string;
    };
  };
}

export default ISettingsPageTranslations;
