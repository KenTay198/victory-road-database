import type ISettingsPageTranslations from "./settingsPage.translations";

const settingsPageEn: ISettingsPageTranslations = {
  metadata: {
    title: "Settings",
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
  inputs: {
    characterLocale: {
      label: "Character Language",
      description: "Choose the default language for character names.",
    },
    hissatsuLocale: {
      label: "Hissatsu Language",
      description: "Choose the default language for Hissatsu names.",
    },
  },
};

export default settingsPageEn;
