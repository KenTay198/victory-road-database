import type Character from "@character/entities/character.entity";
import type ICharacterRepository from "@character/character.repository";
import type ICharacterService from "@character/character.service";
import type { ICharacterCreateData } from "@character/character.types";
import StubCharacterRepository from "./character.stub-repository";

export default class StubCharacterService implements ICharacterService {
  private characterRepository: ICharacterRepository;

  constructor() {
    this.characterRepository = new StubCharacterRepository();
  }

  async findAll(): Promise<Character[]> {
    return await this.characterRepository.findAll();
  }

  async findById(id: string): Promise<Character | null> {
    return await this.characterRepository.findById(id);
  }

  async create(character: ICharacterCreateData): Promise<string> {
    return await this.characterRepository.create(character);
  }
}
