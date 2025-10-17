import type ICharacterComponentsTranslations from "./character.translations";
import importCharactersFr from "./importCharacters/fr";
import newCharacterFormFr from "./newCharacterForm/fr";
import updateCharacterFormFr from "./updateCharacterForm/fr";

const characterComponentsFr: ICharacterComponentsTranslations = {
  newCharacterForm: newCharacterFormFr,
  updateCharacterForm: updateCharacterFormFr,
  importCharacters: importCharactersFr,
};

export default characterComponentsFr;
