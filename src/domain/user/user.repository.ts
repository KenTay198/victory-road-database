import type UserSensitive from "./entities/userSensitive.entity";
import type { IUserData } from "./user.types";

interface IUserRepository {
  findByIdentifier(identifier: string): Promise<UserSensitive | null>;
  create(data: IUserData): Promise<string>;
}

export default IUserRepository;
