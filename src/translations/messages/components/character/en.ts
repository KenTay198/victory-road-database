import type ICharacterComponentsTranslations from "./character.translations";
import importCharactersEn from "./importCharacters/en";
import newCharacterFormEn from "./newCharacterForm/en";
import updateCharacterFormEn from "./updateCharacterForm/en";

const characterComponentsEn: ICharacterComponentsTranslations = {
  newCharacterForm: newCharacterFormEn,
  updateCharacterForm: updateCharacterFormEn,
  importCharacters: importCharactersEn,
};

export default characterComponentsEn;
