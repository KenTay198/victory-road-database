import type Character from "./entities/character.entity";

export default interface ICharacterAdapter {
  toEntity(data: any): Character;
  toDatabase(character: Character): any;
}
