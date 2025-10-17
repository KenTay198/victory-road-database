import type IAdminCharactersPageTranslations from "./adminCharactersPage.translations";
import importCharactersPageEn from "./importCharactersPage/en";

const adminCharactersPageEn: IAdminCharactersPageTranslations = {
  metadata: {
    title: "Manage characters",
    description: "Admin page to manage characters",
  },
  header: "Manage characters",
  import: importCharactersPageEn,
};

export default adminCharactersPageEn;
