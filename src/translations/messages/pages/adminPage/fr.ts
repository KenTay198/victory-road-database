import adminCharactersPageFr from "./adminCharactersPage/fr";
import adminHissatsusPageFr from "./adminHissatsusPage/fr";
import adminMetaPageFr from "./adminMetaPage/fr";
import type IAdminPageTranslations from "./adminPage.translations";

const adminPageFr: IAdminPageTranslations = {
  metadata: {
    title: "Administration",
    description: "Page d'administration pour gérer l'application",
  },
  header: "Administration",
  characters: adminCharactersPageFr,
  meta: adminMetaPageFr,
  hissatsus: adminHissatsusPageFr,
};

export default adminPageFr;
