import Meta from "@meta/meta.entity";
import type Character from "@character/entities/character.entity";
import type IMetaRepository from "@meta/meta.repository";
import StubCharacterService from "@infrastructure/character/stub/character.stub-service";

export default class StubMetaRepository implements IMetaRepository {
  meta: Meta;

  constructor() {
    this.meta = new Meta();
  }

  private async initializeMeta(): Promise<Meta> {
    const characters = await new StubCharacterService().findAll();
    const meta = Meta.calculateStats(characters);
    return meta;
  }

  async get(): Promise<Meta> {
    if (!this.meta || !this.meta.initialized) {
      this.meta = await this.initializeMeta();
    }
    return Promise.resolve(this.meta);
  }
  async calculate(characters: Character[]): Promise<Meta> {
    this.meta = Meta.calculateStats(characters);
    return Promise.resolve(this.meta);
  }
}
