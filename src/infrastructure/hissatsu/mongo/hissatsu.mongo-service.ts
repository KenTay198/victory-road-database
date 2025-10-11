import type Hissatsu from "@hissatsu/hissatsu.entity";
import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type IHissatsuService from "@hissatsu/hissatsu.service";
import MongoHissatsuRepository from "./hissatsu.mongo-repository";
import type { ILearnedHissatsu } from "@character/character.types";
import type { IHissatsuData } from "@hissatsu/hissatsu.types";

export default class MongoHissatsuService implements IHissatsuService {
  private hissatsuRepository: IHissatsuRepository;

  constructor() {
    this.hissatsuRepository = new MongoHissatsuRepository();
  }

  findAll(): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findAll();
  }

  findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    return this.hissatsuRepository.findLearnedHissatsus(learnedHissatsus);
  }

  createMultiple(hissatsu: IHissatsuData[]): Promise<string[]> {
    return this.hissatsuRepository.createMultiple(hissatsu);
  }
}
