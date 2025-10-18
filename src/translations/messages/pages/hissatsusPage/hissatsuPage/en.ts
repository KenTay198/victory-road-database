import type IHissatsuPageTranslations from "./hissatsuPage.translations";
import updateHissatsuPageEn from "./updateHissatsuPage/en";

const hissatsuPageEn: IHissatsuPageTranslations = {
  metadata: {
    title: "{HissatsuName}",
    description: "{HissatsuName} details and information",
  },
  header: "{HissatsuName}",
  sections: {
    general: "General Information",
    translations: "Translations",
  },
  actions: {
    update: "Update hissatsu",
  },
  update: updateHissatsuPageEn,
};

export default hissatsuPageEn;
