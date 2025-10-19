import type IHissatsusPageTranslations from "./hissatsusPage.translations";
import hissatsuPageFr from "./hissatsuPage/fr";
import newHissatsuPageFr from "./newHissatsuPage/fr";

const hissatsusPageFr: IHissatsusPageTranslations = {
  metadata: {
    title: "Hissatsus",
    description: "Liste des Hissatsus d'Inazuma Eleven: Victory Road",
  },
  header: "Liste des hissatsus",
  buttons: {
    mode: {
      general: "Général",
      advanced: "Avancé",
    },
    display: {
      table: "Tableau",
      grid: "Grille",
    },
  },
  actions: {
    add: "Ajouter un hissatsu",
  },
  hissatsu: hissatsuPageFr,
  new: newHissatsuPageFr,
};

export default hissatsusPageFr;
