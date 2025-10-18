interface ICharacterTranslations {
  positions: {
    goalkeeper: string;
    defender: string;
    midfielder: string;
    forward: string;
  };
  properties: {
    fullName: string;
    firstName: string;
    lastName: string;
    element: string;
    imageUrl: string;
    defaultPosition: string;
    statistics: string;
    advancedStatistics: string;
    archetypes: string;
    hissatsus: string;
    hissatsuNb: string;
  };
  statistics: {
    kick: string;
    control: string;
    pressure: string;
    physical: string;
    agility: string;
    intelligence: string;
    technique: string;
    total: string;
  };
  advancedStatistics: {
    shoot: string;
    focusAtt: string;
    scrambleAtt: string;
    faceoffAtt: string;
    totalAtt: string;
    wall: string;
    focusDef: string;
    scrambleDef: string;
    faceoffDef: string;
    totalDef: string;
    gk: string;
  };
  archetypes: {
    striker: string;
    forward: string;
    "long-shooter": string;
    "attacking-midfielder": string;
    "central-midfielder": string;
    "defensive-midfielder": string;
    defender: string;
    "wall-defender": string;
    goalkeeper: string;
    none: string;
  };
  comparison: {
    title: string;
    general: string;
    criteria: string;
    errors: {
      min: string;
      max: string;
    };
  };
  tendencies: string;
}

export default ICharacterTranslations;
