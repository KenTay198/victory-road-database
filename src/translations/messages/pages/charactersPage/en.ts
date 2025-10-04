import characterPageEn from "./characterPage/en";
import type ICharactersPageTranslations from "./charactersPage.translations";

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
    },
    display: {
      table: "Table",
      grid: "Grid",
    },
  },
  pages: {
    character: characterPageEn,
  },
};

export default charactersPageEn;
