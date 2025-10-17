import type Character from "@character/entities/character.entity";
import type ICharacterRepository from "@character/character.repository";
import type ICharacterService from "@character/character.service";
import MongoCharacterRepository from "@infrastructure/character/mongo/character.mongo-repository";
import type { ICharacterData } from "@character/character.types";

export default class MongoCharacterService implements ICharacterService {
  private characterRepository: ICharacterRepository;

  constructor() {
    this.characterRepository = new MongoCharacterRepository();
  }

  findAll(): Promise<Character[]> {
    return this.characterRepository.findAll();
  }

  findById(id: string): Promise<Character | null> {
    return this.characterRepository.findById(id);
  }

  create(character: ICharacterData): Promise<string> {
    return this.characterRepository.create(character);
  }

  createMultiple(characters: ICharacterData[]): Promise<string[]> {
    return this.characterRepository.createMultiple(characters);
  }

  updateById(id: string, character: Partial<ICharacterData>): Promise<boolean> {
    return this.characterRepository.updateById(id, character);
  }
}
