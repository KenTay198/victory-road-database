import type ICharacterTranslations from "./character.translations";

const characterFr: ICharacterTranslations = {
  positions: {
    goalkeeper: "Gardien",
    defender: "Défenseur",
    midfielder: "Milieu de terrain",
    forward: "Attaquant",
  },
  properties: {
    fullName: "Nom complet",
    firstName: "Prénom",
    lastName: "Nom de famille",
    element: "Élément",
    defaultPosition: "Position par défaut",
    statistics: "Statistiques",
    advancedStatistics: "Statistiques avancées",
    archetypes: "Archétypes",
  },
  statistics: {
    kick: "Frappe",
    control: "Contrôle",
    pressure: "Pressing",
    physical: "Physique",
    agility: "Agilité",
    intelligence: "Intelligence",
    technique: "Technique",
    total: "Total",
  },
  advancedStatistics: {
    shoot: "Tir Att",
    focusAtt: "Focus Att",
    scrambleAtt: "Duel Att",
    faceoffAtt: "Affrontement Att",
    totalAtt: "Total Att",
    wall: "Mur Def",
    focusDef: "Focus Def",
    scrambleDef: "Duel Def",
    totalDef: "Total Def",
    faceoffDef: "Affrontement Def",
    gk: "Arrêt",
  },
  archetypes: {
    striker: "Buteur",
    forward: "Attaquant",
    "long-shooter": "Tireur de loin",
    "attacking-midfielder": "Milieu offensif",
    "central-midfielder": "Milieu central",
    "defensive-midfielder": "Milieu défensif",
    defender: "Défenseur",
    "wall-defender": "Mur",
    goalkeeper: "Gardien",
    none: "Aucun",
  },
  comparison: {
    title: "Comparer les personnages",
    general: "Informations générales",
    criteria: "Critères",
    errors: {
      min: "Veuillez sélectionner au moins deux personnages à comparer.",
      max: "Vous pouvez comparer jusqu'à 5 personnages à la fois.",
    },
  },
};

export default characterFr;
