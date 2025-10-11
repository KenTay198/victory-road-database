import characterPageEn from "./characterPage/en";
import type ICharactersPageTranslations from "./charactersPage.translations";
import newCharacterPageEn from "./newCharacterPage/en";

const charactersPageEn: ICharactersPageTranslations = {
  metadata: {
    title: "Characters | Victory Road Database",
    description: "List of characters from Inazuma Eleven: Victory Road",
  },
  header: "List of characters",
  buttons: {
    mode: {
      general: "General",
      advanced: "Advanced",
      hissatsu: "Hissatsu",
    },
    display: {
      table: "Table",
      grid: "Grid",
    },
  },
  character: characterPageEn,
  new: newCharacterPageEn,
  actions: {
    add: "Add a character",
  },
};

export default charactersPageEn;
