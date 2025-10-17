import type IImportCharactersTranslations from "./importCharacters/importCharacters.translations";
import type INewCharacterFormTranslations from "./newCharacterForm/newCharacterForm.translations";
import type IUpdateCharacterFormTranslations from "./updateCharacterForm/updateCharacterForm.translations";

interface ICharacterComponentsTranslations {
  newCharacterForm: INewCharacterFormTranslations;
  updateCharacterForm: IUpdateCharacterFormTranslations;
  importCharacters: IImportCharactersTranslations;
}

export default ICharacterComponentsTranslations;
