import type Character from "./entities/character.entity";
import type { ICharacter, ICharacterData } from "./character.types";

export default interface ICharacterAdapter {
  toEntity(data: any): Character;
  createToDatabase(character: ICharacterData): any;
  updateToDatabase(character: Partial<ICharacter>): any;
}
