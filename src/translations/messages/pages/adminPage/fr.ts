import adminCharactersPageFr from "./adminCharactersPage/fr";
import adminMetaPageFr from "./adminMetaPage/fr";
import type IAdminPageTranslations from "./adminPage.translations";

const adminPageFr: IAdminPageTranslations = {
  metadata: {
    title: "Admin",
    description: "Page d'administration pour gérer l'application",
  },
  header: "Admin",
  characters: adminCharactersPageFr,
  meta: adminMetaPageFr,
};

export default adminPageFr;
