import type Character from "./entities/character.entity";

interface ICharacterRepository {
  findAll: () => Promise<Character[]>;
  findById: (id: string) => Promise<Character | null>;
}

export default ICharacterRepository;
