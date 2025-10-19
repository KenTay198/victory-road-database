import type IAdminHissatsusPageTranslations from "./adminHissatsusPage.translations";
import importHissatsusPageFr from "./importHissatsusPage/fr";

const adminHissatsusPageFr: IAdminHissatsusPageTranslations = {
  metadata: {
    title: "Gérer les hissatsus",
    description: "Page d'administration pour gérer les hissatsus",
  },
  header: "Gérer les hissatsus",
  import: importHissatsusPageFr,
};

export default adminHissatsusPageFr;
