import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import type { IHissatsuCreateData } from "@hissatsu/hissatsu.types";
import StubHissatsuRepository from "./hissatsu.stub-repository";
import type Character from "@character/entities/character.entity";

export default class StubHissatsuService implements IHissatsuService {
  private hissatsuRepository: IHissatsuRepository;

  constructor() {
    this.hissatsuRepository = new StubHissatsuRepository();
  }

  findAll(): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findAll();
  }

  findById(id: string): Promise<Hissatsu | null> {
    return this.hissatsuRepository.findById(id);
  }

  findByCharacter(character: Character): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findByCharacter(character);
  }

  create(hissatsu: IHissatsuCreateData): Promise<string> {
    return this.hissatsuRepository.create(hissatsu);
  }
}
