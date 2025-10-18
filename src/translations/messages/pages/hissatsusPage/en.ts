import type IHissatsusPageTranslations from "./hissatsusPage.translations";
import hissatsuPageEn from "./hissatsuPage/en";
import newHissatsuPageEn from "./newHissatsuPage/en";

const hissatsusPageEn: IHissatsusPageTranslations = {
  metadata: {
    title: "Hissatsus",
    description: "List of Hissatsus from Inazuma Eleven: Victory Road",
  },
  header: "List of hissatsus",
  buttons: {
    mode: {
      general: "General",
      advanced: "Advanced",
    },
    display: {
      table: "Table",
      grid: "Grid",
    },
  },
  actions: {
    add: "Add hissatsu",
  },
  hissatsu: hissatsuPageEn,
  new: newHissatsuPageEn,
};

export default hissatsusPageEn;
