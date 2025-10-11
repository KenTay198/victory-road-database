import type UserSensitive from "./entities/userSensitive.entity";
import type { ICreateUserData } from "./user.types";

interface IUserRepository {
  findByIdentifier(identifier: string): Promise<UserSensitive | null>;
  create(data: ICreateUserData): Promise<string>;
}

export default IUserRepository;
