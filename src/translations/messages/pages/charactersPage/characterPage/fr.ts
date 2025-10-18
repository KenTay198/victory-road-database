import type ICharacterPageTranslations from "./characterPage.translations";
import updateCharacterPageFr from "./updateCharacterPage/fr";

const characterPageFr: ICharacterPageTranslations = {
  metadata: {
    title: "{CharacterName}",
    description: "Détails et informations de {CharacterName}",
  },
  sections: {
    general: "Général",
    statistics: "Statistiques",
    hissatsus: "Hissatsus",
    translations: "Traductions",
  },
  actions: {
    update: "Mettre à jour le personnage",
  },
  update: updateCharacterPageFr,
};

export default characterPageFr;
