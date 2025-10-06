import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import StubHissatsuRepository from "./hissatsu.stub-repository";
import type { ILearnedHissatsu } from "@character/character.types";

export default class StubHissatsuService implements IHissatsuService {
  private hissatsuRepository: IHissatsuRepository;

  constructor() {
    this.hissatsuRepository = new StubHissatsuRepository();
  }

  findAll(): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findAll();
  }

  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findLearnedHissatsus(learnedHissatsus);
  }
}
