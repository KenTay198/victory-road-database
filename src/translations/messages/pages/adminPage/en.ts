import adminCharactersPageEn from "./adminCharactersPage/en";
import adminHissatsusPageEn from "./adminHissatsusPage/en";
import adminMetaPageEn from "./adminMetaPage/en";
import type IAdminPageTranslations from "./adminPage.translations";

const adminPageEn: IAdminPageTranslations = {
  metadata: {
    title: "Admin",
    description: "Admin page for managing the application",
  },
  header: "Admin",
  characters: adminCharactersPageEn,
  meta: adminMetaPageEn,
  hissatsus: adminHissatsusPageEn,
};

export default adminPageEn;
