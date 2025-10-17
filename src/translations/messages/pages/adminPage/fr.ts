import adminCharactersPageFr from "./adminCharactersPage/fr";
import type IAdminPageTranslations from "./adminPage.translations";

const adminPageFr: IAdminPageTranslations = {
  metadata: {
    title: "Admin",
    description: "Page d'administration pour gérer l'application",
  },
  header: "Admin",
  characters: adminCharactersPageFr,
};

export default adminPageFr;
