import characterPageFr from "./characterPage/fr";
import type ICharactersPageTranslations from "./charactersPage.translations";
import newCharacterPageFr from "./newCharacterPage/fr";

const charactersPageFr: ICharactersPageTranslations = {
  metadata: {
    title: "Personnages | Victory Road Database",
    description: "Liste des personnages de Inazuma Eleven: Victory Road",
  },
  header: "Liste des personnages",
  buttons: {
    mode: {
      general: "Général",
      advanced: "Avancé",
      hissatsu: "Hissatsu",
    },
    display: {
      table: "Table",
      grid: "Grille",
    },
  },
  actions: {
    add: "Ajouter un personnage",
  },
  character: characterPageFr,
  new: newCharacterPageFr,
};

export default charactersPageFr;
