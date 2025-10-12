import type Meta from "@meta/meta.entity";
import type IMetaRepository from "@meta/meta.repository";
import type IMetaService from "@meta/meta.service";
import type Character from "@character/entities/character.entity";
import MongoMetaRepository from "./meta.mongo-repository";

export default class MongoMetaService implements IMetaService {
  private metaRepository: IMetaRepository;

  constructor() {
    this.metaRepository = new MongoMetaRepository();
  }

  get(): Promise<Meta> {
    return this.metaRepository.get();
  }

  calculate(characters: Character[]): Promise<Meta> {
    return this.metaRepository.calculate(characters);
  }
}
