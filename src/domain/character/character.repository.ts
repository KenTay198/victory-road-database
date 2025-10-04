import type Character from "./entities/character.entity";
import type { ICharacterCreateData } from "./character.types";

interface ICharacterRepository {
  findAll: () => Promise<Character[]>;
  findById: (id: string) => Promise<Character | null>;
  create: (character: ICharacterCreateData) => Promise<string>;
}

export default ICharacterRepository;
