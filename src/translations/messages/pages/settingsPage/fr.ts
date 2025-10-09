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
  inputs: {
    characterLocale: {
      label: "Langue des personnages",
      description: "Choisissez la langue par défaut pour les noms des personnages.",
    },
    hissatsuLocale: {
      label: "Langue des Hissatsus",
      description: "Choisissez la langue par défaut pour les noms des Hissatsus.",
    },
  },
};

export default settingsPageFr;
