import type IAdminCharactersPageTranslations from "./adminCharactersPage.translations";
import importCharactersPageFr from "./importCharactersPage/fr";

const adminCharactersPageFr: IAdminCharactersPageTranslations = {
  metadata: {
    title: "Gérer les personnages",
    description: "Page d'administration pour gérer les personnages",
  },
  header: "Gérer les personnages",
  import: importCharactersPageFr,
};

export default adminCharactersPageFr;
