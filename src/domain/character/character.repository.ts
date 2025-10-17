import type { ICharacterData } from "./character.types";
import type Character from "./entities/character.entity";

interface ICharacterRepository {
  findAll: () => Promise<Character[]>;
  findById: (id: string) => Promise<Character | null>;
  create: (character: ICharacterData) => Promise<string>;
  createMultiple: (characters: ICharacterData[]) => Promise<string[]>;
  updateById: (id: string, character: Partial<ICharacterData>) => Promise<boolean>;
}

export default ICharacterRepository;
