import type ICharacterPageTranslations from "./characterPage.translations";
import updateCharacterPageEn from "./updateCharacterPage/en";

const characterPageEn: ICharacterPageTranslations = {
  metadata: {
    title: "{CharacterName}",
    description: "{CharacterName} details and information",
  },
  sections: {
    general: "General",
    statistics: "Statistics",
    hissatsus: "Hissatsus",
    translations: "Translations",
  },
  actions: {
    update: "Update character",
  },
  update: updateCharacterPageEn,
};

export default characterPageEn;
