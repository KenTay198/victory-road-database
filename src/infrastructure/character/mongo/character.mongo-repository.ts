import type Character from "@character/entities/character.entity";
import type ICharacterRepository from "@character/character.repository";
import { connectMongo } from "@infrastructure/database/mongo.config";
import CharacterModel, { type ICharacterDocument } from "./character.mongo-model";
import MongoCharacterAdapter from "./character.mongo-adapter";
import type ICharacterAdapter from "@character/character.adapter";
import type { ICharacterData } from "@character/character.types";

export default class MongoCharacterRepository implements ICharacterRepository {
  adapter: ICharacterAdapter = new MongoCharacterAdapter();

  private async ensureConnection(): Promise<void> {
    await connectMongo();
  }

  async findAll(): Promise<Character[]> {
    await this.ensureConnection();
    const characters: ICharacterDocument[] = await CharacterModel.find().exec();
    return characters.map((data) => this.adapter.toEntity(data));
  }

  async findById(id: string): Promise<Character | null> {
    await this.ensureConnection();
    const character: ICharacterDocument | null = await CharacterModel.findById(id).exec();
    return character ? this.adapter.toEntity(character) : null;
  }

  async create(data: ICharacterData): Promise<string> {
    await this.ensureConnection();
    const newCharacter = new CharacterModel(data);
    const savedCharacter = await newCharacter.save();
    return savedCharacter._id.toString();
  }

  async updateById(id: string, character: Partial<ICharacterData>): Promise<boolean> {
    await this.ensureConnection();
    const result = await CharacterModel.updateOne({ _id: id }, { $set: character }).exec();
    return result.matchedCount > 0;
  }
}
