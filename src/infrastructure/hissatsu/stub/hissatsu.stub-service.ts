import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import StubHissatsuRepository from "./hissatsu.stub-repository";
import type { ILearnedHissatsu } from "@character/character.types";
import type { IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";

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

  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findLearnedHissatsus(learnedHissatsus);
  }

  create(hissatsu: IHissatsuFormData): Promise<string> {
    return this.hissatsuRepository.create(hissatsu);
  }

  createMultiple(hissatsu: IHissatsuData[]): Promise<string[]> {
    return this.hissatsuRepository.createMultiple(hissatsu);
  }

  update(id: string, hissatsu: IHissatsuFormData): Promise<boolean> {
    return this.hissatsuRepository.update(id, hissatsu);
  }
}
