import type IHissatsuRepository from "@hissatsu/hissatsu.repository";
import type Hissatsu from "@hissatsu/hissatsu.entity";
import type { IHissatsuData, IHissatsuFormData } from "@hissatsu/hissatsu.types";
import type { ILearnedHissatsu } from "@character/character.types";
import HissatsuModel from "./hissatsu.mongo-model";
import MongoHissatsuAdapter from "./hissatsu.mongo-adapter";
import { connectMongo } from "@infrastructure/database/mongo.config";

export default class MongoHissatsuRepository implements IHissatsuRepository {
  private adapter = new MongoHissatsuAdapter();

  async findAll(): Promise<Hissatsu[]> {
    await connectMongo();
    const documents = await HissatsuModel.find();
    return documents.map((doc) => this.adapter.toEntity(doc));
  }

  async findById(id: string): Promise<Hissatsu | null> {
    await connectMongo();
    const document = await HissatsuModel.findById(id);
    return document ? this.adapter.toEntity(document) : null;
  }

  async findLearnedHissatsus(learnedHissatsus: ILearnedHissatsu[]): Promise<Hissatsu[]> {
    await connectMongo();
    const hissatsuIds = learnedHissatsus.map(({ id }) => id);
    const documents = await HissatsuModel.find({ _id: { $in: hissatsuIds } });
    return documents.map((doc) => this.adapter.toEntity(doc));
  }

  async create(hissatsuData: IHissatsuFormData): Promise<string> {
    await connectMongo();
    const document = await HissatsuModel.create(hissatsuData);
    return document._id.toString();
  }

  async createMultiple(hissatsus: IHissatsuData[]): Promise<string[]> {
    await connectMongo();
    const documents = await HissatsuModel.insertMany(hissatsus);
    return documents.map((doc) => doc._id.toString());
  }

  async update(id: string, hissatsuData: IHissatsuFormData): Promise<boolean> {
    await connectMongo();
    const result = await HissatsuModel.findByIdAndUpdate(id, hissatsuData, { new: true });
    return !!result;
  }
}
