import type ICharacterPageTranslations from "./characterPage.translations";
import updateCharacterPageEn from "./updateCharacterPage/en";

const characterPageEn: ICharacterPageTranslations = {
  metadata: {
    title: "{CharacterName} | Victory Road Database",
    description: "{CharacterName} details and information",
  },
  sections: {
    general: "General",
    statistics: "Statistics",
    hissatsus: "Hissatsus",
  },
  actions: {
    update: "Update character",
  },
  update: updateCharacterPageEn,
};

export default characterPageEn;
