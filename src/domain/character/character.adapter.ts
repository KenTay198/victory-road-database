import type Character from "./entities/character.entity";
import type { ICharacterData } from "./character.types";

export default interface ICharacterAdapter {
  toEntity(data: any): Character;
  createToDatabase(character: ICharacterData): any;
  updateToDatabase(character: Partial<ICharacterData>): any;
}
