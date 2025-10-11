interface INewCharacterFormTranslations {
  sections: {
    general: string;
    dubName: string;
    voName: string;
  };
  fields: {
    defaultPosition: {
      description: string;
    };
  };
  errors: {
    invalidImage: string;
    statMinValue: string;
    statMaxValue: string;
  };
  toasts: {
    success: string;
    error: string;
    loading: string;
  };
  actions: {
    newHissatsu: string;
  };
}

export default INewCharacterFormTranslations;
