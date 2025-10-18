import type { IToastTranslations } from "@translations/messages/messages.translations";

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
  toasts: IToastTranslations;
  actions: {
    newHissatsu: string;
  };
}

export default INewCharacterFormTranslations;
