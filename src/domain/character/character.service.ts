import type Character from "./entities/character.entity";
import type { ICharacterCreateData } from "./character.types";

interface ICharacterService {
  findAll(): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
  create(characterData: ICharacterCreateData): Promise<string>;
}

export default ICharacterService;
