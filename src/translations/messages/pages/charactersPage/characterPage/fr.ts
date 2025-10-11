import type ICharacterPageTranslations from "./characterPage.translations";
import updateCharacterPageFr from "./updateCharacterPage/fr";

const characterPageFr: ICharacterPageTranslations = {
  metadata: {
    title: "{CharacterName} | Victory Road Database",
    description: "Détails et informations de {CharacterName}",
  },
  sections: {
    general: "Général",
    statistics: "Statistiques",
    hissatsus: "Hissatsus",
  },
  actions: {
    update: "Mettre à jour le personnage",
  },
  update: updateCharacterPageFr,
};

export default characterPageFr;
