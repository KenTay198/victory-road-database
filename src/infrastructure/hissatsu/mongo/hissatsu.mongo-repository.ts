import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type { IHissatsuData } from "@hissatsu/hissatsu.types";
import type { ILearnedHissatsu } from "@character/character.types";
import HissatsuModel from "./hissatsu.mongo-model";
import MongoHissatsuAdapter from "./hissatsu.mongo-adapter";

export default class MongoHissatsuRepository implements IHissatsuRepository {
  private adapter = new MongoHissatsuAdapter();

  async findAll(): Promise<Hissatsu[]> {
    const documents = await HissatsuModel.find();
    return documents.map((doc) => this.adapter.toEntity(doc));
  }

  async createMultiple(hissatsus: IHissatsuData[]): Promise<string[]> {
    const documents = await HissatsuModel.insertMany(hissatsus);
    return documents.map((doc) => doc._id.toString());
  }

  async findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    const hissatsuIds = learnedHissatsus.map(({ id }) => id);
    const documents = await HissatsuModel.find({ _id: { $in: hissatsuIds } });
    return documents.map((doc) => this.adapter.toEntity(doc));
  }
}
