import type IMetaRepository from "@meta/meta.repository";
import Meta from "@meta/meta.entity";
import type Character from "@character/entities/character.entity";
import MetaModel from "./meta.mongo-model";
import MongoMetaAdapter from "./meta.mongo-adapter";
import { connectMongo } from "@infrastructure/database/mongo.config";

export default class MongoMetaRepository implements IMetaRepository {
  private adapter = new MongoMetaAdapter();

  async get(): Promise<Meta> {
    await connectMongo();
    let document = await MetaModel.findOne();
    if (!document) {
      document = await MetaModel.create(new Meta().toJSON());
    }
    return this.adapter.toEntity(document);
  }

  async calculate(characters: Character[]): Promise<Meta> {
    await connectMongo();
    const calculatedMeta = Meta.calculateStats(characters);
    await MetaModel.deleteMany({});
    const document = await MetaModel.create(calculatedMeta.toJSON());
    return this.adapter.toEntity(document);
  }
}
