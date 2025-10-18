import type IHissatsuPageTranslations from "./hissatsuPage.translations";
import updateHissatsuPageFr from "./updateHissatsuPage/fr";

const hissatsuPageFr: IHissatsuPageTranslations = {
  metadata: {
    title: "{HissatsuName}",
    description: "Détails et informations de {HissatsuName}",
  },
  header: "{HissatsuName}",
  sections: {
    general: "Informations générales",
    translations: "Traductions",
  },
  actions: {
    update: "Modifier le hissatsu",
  },
  update: updateHissatsuPageFr,
};

export default hissatsuPageFr;
