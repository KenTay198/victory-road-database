import type IUserAdapter from "@user/user.adapter";
import type { IUserDocument } from "./user.mongo-model";
import UserSensitive from "@user/entities/userSensitive.entity";

export default class MongoUserAdapter implements IUserAdapter {
  toEntity(data: IUserDocument): UserSensitive {
    return new UserSensitive({
      id: data._id.toString(),
      email: data.email,
      username: data.username,
      role: data.role,
      password: data.password,
    });
  }
}
