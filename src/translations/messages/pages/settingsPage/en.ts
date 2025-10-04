import type ISettingsPageTranslations from "./settingsPage.translations";

const settingsPageEn: ISettingsPageTranslations = {
  metadata: {
    title: "Settings | Victory Road Database",
    description: "Configure your Victory Road database",
  },
  header: "Settings",
  toasts: {
    update: {
      success: "Settings updated successfully.",
      error: "Error updating settings.",
      loading: "Updating settings...",
    },
  },
};

export default settingsPageEn;
