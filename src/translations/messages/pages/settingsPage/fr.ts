import type ISettingsPageTranslations from "./settingsPage.translations";

const settingsPageFr: ISettingsPageTranslations = {
  metadata: {
    title: "Paramètres | Victory Road Database",
    description: "Configurer votre base de données Victory Road",
  },
  header: "Paramètres",
  toasts: {
    update: {
      success: "Les paramètres ont été mis à jour avec succès.",
      error: "Une erreur s'est produite lors de la mise à jour des paramètres.",
      loading: "Mise à jour des paramètres en cours...",
    },
  },
};

export default settingsPageFr;
