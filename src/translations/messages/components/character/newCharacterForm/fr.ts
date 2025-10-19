import type INewCharacterFormTranslations from "./newCharacterForm.translations";

const newCharacterFormFr: INewCharacterFormTranslations = {
  fields: {
    defaultPosition: {
      description: "Position par défaut du personnage (selon le jeu).",
    },
  },
  sections: {
    general: "Informations générales",
    dubName: "Nom occidental",
    voName: "Nom original",
  },
  errors: {
    invalidImage: "L'URL de l'image n'est pas valide.",
    statMinValue: "La valeur doit être supérieure ou égale à 0.",
    statMaxValue: "La valeur ne doit pas dépasser 999.",
  },
  toasts: {
    success: "Personnage créé avec succès",
    error: "Erreur lors de la création du personnage",
    loading: "Création du personnage en cours...",
  },
  actions: {
    newHissatsu: "Nouveau Hissatsu",
  },
};

export default newCharacterFormFr;
