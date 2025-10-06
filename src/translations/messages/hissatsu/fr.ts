import type IHissatsuTranslations from "./hissatsu.translations";

const hissatsuFr: IHissatsuTranslations = {
  properties: {
    name: "Nom",
    element: "Élément",
    type: "Type",
    power: "Puissance",
    cost: "Coût",
    characteristic: "Caractéristique",
    learnLevel: "Niveau d'apprentissage",
  },
  types: {
    kick: "Tir",
    dribble: "Dribble",
    defense: "Défense",
    keep: "Arrêt",
  },
  characteristics: {
    long: "Tir longue distance",
    block: "Blocage de tir",
  },
};

export default hissatsuFr;
