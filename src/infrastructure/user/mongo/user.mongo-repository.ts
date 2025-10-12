import type IUserRepository from "@user/user.repository";
import type UserSensitive from "@user/entities/userSensitive.entity";
import type { IUserData } from "@user/user.types";
import UserModel from "./user.mongo-model";
import MongoUserAdapter from "./user.mongo-adapter";

export default class MongoUserRepository implements IUserRepository {
  private adapter = new MongoUserAdapter();

  async create(userData: IUserData): Promise<string> {
    const document = await UserModel.create(userData);
    return document._id.toString();
  }

  async findByIdentifier(identifier: string): Promise<UserSensitive | null> {
    const document = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    return document ? this.adapter.toEntity(document) : null;
  }
}
