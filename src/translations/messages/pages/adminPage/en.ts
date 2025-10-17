import adminCharactersPageEn from "./adminCharactersPage/en";
import type IAdminPageTranslations from "./adminPage.translations";

const adminPageEn: IAdminPageTranslations = {
  metadata: {
    title: "Admin",
    description: "Admin page for managing the application",
  },
  header: "Admin",
  characters: adminCharactersPageEn,
};

export default adminPageEn;
