import type INewCharacterFormTranslations from "./newCharacterForm.translations";

const newCharacterFormEn: INewCharacterFormTranslations = {
  fields: {
    defaultPosition: {
      description: "Default position of the character (according to the game).",
    },
  },
  sections: {
    general: "General information",
    dubName: "Western name",
    voName: "Original name",
  },
  errors: {
    invalidImage: "The provided URL is not a valid image.",
    statMinValue: "The value must be greater or equal to 0.",
    statMaxValue: "The value must not exceed 999.",
  },
  toasts: {
    success: "Character created successfully",
    error: "Error creating character",
    loading: "Creating character...",
  },
  actions: {
    newHissatsu: "New Hissatsu",
  },
};

export default newCharacterFormEn;
