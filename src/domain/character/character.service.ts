import type { ICharacterData } from "./character.types";
import type Character from "./entities/character.entity";

interface ICharacterService {
  findAll(): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  create: (character: ICharacterData) => Promise<string>;
  updateById: (id: string, character: Partial<ICharacterData>) => Promise<boolean>;
}

export default ICharacterService;
