import type Character from "./entities/character.entity";

interface ICharacterService {
  findAll(): Promise<Character[]>;
  findById(id: string): Promise<Character | null>;
}

export default ICharacterService;
