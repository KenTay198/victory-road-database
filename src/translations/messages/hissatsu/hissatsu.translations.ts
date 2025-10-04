interface IHissatsuTranslations {
  properties: {
    name: string;
    element: string;
    type: string;
    power: string;
    cost: string;
    characteristic: string;
  };
  types: {
    kick: string;
    dribble: string;
    defense: string;
    keep: string;
  };
  characteristics: {
    long: string;
    block: string;
  };
}

export default IHissatsuTranslations;
